import pool from '../config/db.js';

// Create a new payment reminder
export const createPayment = async (req, res) => {
  try {
    const { label, payment_date, amount } = req.body;
    if (!label || !payment_date) {
      return res.status(400).json({ message: 'Label and date required' });
    }
    const result = await pool.query(
      `INSERT INTO payments (label, payment_date, amount)
       VALUES ($1, $2, $3) RETURNING *`,
      [label, payment_date, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating payment reminder:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all payment reminders
export const getPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM payments ORDER BY payment_date ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching payment reminders:', err);
    res.status(500).json({ message: err.message });
  }
};
// Get pending payments (not yet paid)
export const getPendingPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM payments WHERE is_paid = FALSE ORDER BY payment_date ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching pending payments:', err);
    res.status(500).json({ message: err.message });
  }
};
// Mark a payment as paid
export const markPaymentPaid = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`UPDATE payments SET is_paid = TRUE WHERE id = $1`, [id]);
    res.json({ message: 'Payment marked as paid' });
  } catch (err) {
    console.error('Error marking payment paid:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a payment reminder
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `DELETE FROM payments WHERE id = $1`,
      [id]
    );
    res.json({ message: 'Payment reminder deleted' });
  } catch (err) {
    console.error('Error deleting payment reminder:', err);
    res.status(500).json({ message: err.message });
  }
};
