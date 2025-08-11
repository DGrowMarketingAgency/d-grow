import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createPayment, getPayments, deletePayment, getPendingPayments, markPaymentPaid } from '../controllers/paymentsController.js';

const router = express.Router();

// Get all payments (Admin & SuperAdmin)
// Get all payments (Admin, SuperAdmin, Client)
router.get('/', protect(['Admin','Super Admin','Client']), getPayments);
// Get pending payments (not yet paid)
// Get pending payments (Admin, SuperAdmin, Client)
router.get('/pending', protect(['Admin','Super Admin','Client']), getPendingPayments);

// Create new payment reminder (Admin & SuperAdmin)
router.post('/', protect(['Admin','SuperAdmin','Super Admin']), createPayment);

// Delete a payment reminder
router.delete('/:id', protect(['Admin','SuperAdmin','Super Admin']), deletePayment);
// Mark a payment as paid
// Mark a payment as paid (Admin, SuperAdmin, Client)
router.patch('/:id/paid', protect(['Admin','Super Admin','Client']), markPaymentPaid);

export default router;
