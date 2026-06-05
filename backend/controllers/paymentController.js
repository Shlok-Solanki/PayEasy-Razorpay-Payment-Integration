// paymentController.js — Business Logic for Payments
// Controllers handle what SHOULD happen when a route is triggered

const Razorpay = require('razorpay');
const crypto = require('crypto');         // Built-in Node.js module for hashing
const Payment = require('../models/Payment');  // Import our Mongoose model

// Initialize Razorpay instance using credentials from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ─────────────────────────────────────────────
// CONTROLLER 1: Create Order
// POST /api/payment/order
// Called when user submits the payment form
// ─────────────────────────────────────────────
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;  // Amount in rupees sent from frontend

    // Validate: amount must be a positive number
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Razorpay needs amount in PAISE (multiply ₹ by 100)
    const amountInPaise = amount * 100;

    // Options object for creating an order
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,  // Unique receipt ID using timestamp
    };

    // Create order using Razorpay SDK — returns a Promise
    const order = await razorpay.orders.create(options);

    // Save initial payment record in MongoDB (status = 'created')
    await Payment.create({
      razorpayOrderId: order.id,
      amount: amountInPaise,
      currency: 'INR',
      status: 'created',
    });

    // Send order details back to frontend
    res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error('Create Order Error:', error.message);
    res.status(500).json({ message: 'Server Error: Could not create order' });
  }
};


// ─────────────────────────────────────────────
// CONTROLLER 2: Verify Payment
// POST /api/payment/verify
// Called after user completes payment in Razorpay popup
// ─────────────────────────────────────────────
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // STEP 1: Create a signature to verify payment authenticity
    // Razorpay signs: "orderId|paymentId" using your Key Secret
    const body = razorpayOrderId + '|' + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  // HMAC-SHA256 hash
      .update(body)
      .digest('hex');  // Convert to hexadecimal string

    // STEP 2: Compare generated signature with the one from Razorpay
    if (expectedSignature !== razorpaySignature) {
      // Signatures don't match — payment may be tampered
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // STEP 3: Update payment record in MongoDB to 'paid'
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpayOrderId },    // Find by order ID
      {
        razorpayPaymentId: razorpayPaymentId,  // Save payment ID
        status: 'paid',                         // Update status
      }
    );

    res.status(200).json({ message: 'Payment verified and saved successfully!' });

  } catch (error) {
    console.error('Verify Payment Error:', error.message);
    res.status(500).json({ message: 'Server Error: Could not verify payment' });
  }
};


// ─────────────────────────────────────────────
// CONTROLLER 3: Get Payment History
// GET /api/payment/history
// Returns all payment records from MongoDB
// ─────────────────────────────────────────────
const getPaymentHistory = async (req, res) => {
  try {
    // Fetch all payments, newest first (-1 = descending order)
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json(payments);

  } catch (error) {
    console.error('Get History Error:', error.message);
    res.status(500).json({ message: 'Server Error: Could not fetch history' });
  }
};


// Export all three controllers
module.exports = { createOrder, verifyPayment, getPaymentHistory };