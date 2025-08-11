import PDFDocument from "pdfkit";
import pool from "../config/db.js";

export const getDepartmentStatusReport = async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ message: "Department query parameter is required" });
    }
    // Fetch tasks related to the department
    const result = await pool.query(
      `SELECT t.*, u.name as employee_name 
       FROM tasks t 
       JOIN users u ON t.assigned_to = u.id 
       WHERE t.department = $1
       ORDER BY t.created_at DESC`,
      [department]
    );
    const tasks = result.rows;

    // Create a PDF document
    const doc = new PDFDocument();
    // Set PDF response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Status_Report_${department}.pdf`);

    // Pipe the PDF to the response
    doc.pipe(res);

    doc.fontSize(20).text(`Department Status Report: ${department}`, { align: "center" });
    doc.moveDown();

    if (tasks.length === 0) {
      doc.fontSize(14).text("No tasks found for this department.", { align: "center" });
    } else {
      tasks.forEach((task, idx) => {
        doc.fontSize(14).text(`${idx + 1}. ${task.title}`, { underline: true });
        doc.fontSize(12).text(`Description: ${task.description}`);
        doc.text(`Assigned to: ${task.employee_name}`);
        doc.text(`Status: ${task.status}`);
        doc.moveDown();
      });
    }
    doc.end();
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Error generating report" });
  }
};