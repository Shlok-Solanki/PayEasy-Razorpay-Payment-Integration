// paymentRoutes.js — API Route Definitions
// Routes map HTTP methods + URLs to controller functions

const express = require('express');
const router = express.Router();  // Create a mini Express app for routes

// Import controller functions
const {
  createOrder,
  verifyPayment,
  getPaymentHistory,
} = require('../controllers/paymentController');

// Route 1: POST /api/payment/order
// Called when payment form is submitted
router.post('/order', createOrder);

// Route 2: POST /api/payment/verify
// Called after Razorpay checkout is completed
router.post('/verify', verifyPayment);

// Route 3: GET /api/payment/history
// Called when history page loads
router.get('/history', getPaymentHistory);

module.exports = router;  // Export router for use in server.js