// Payment.js — Mongoose Schema (Model)
// Defines the structure of payment documents stored in MongoDB

const mongoose = require('mongoose');

// Define the schema — like a blueprint for each payment record
const paymentSchema = new mongoose.Schema(
  {
    // Razorpay Order ID — created before payment
    razorpayOrderId: {
      type: String,
      required: true,   // This field is mandatory
    },

    // Razorpay Payment ID — received after successful payment
    razorpayPaymentId: {
      type: String,
      default: '',      // Empty until payment is confirmed
    },

    // Amount in paise (₹1 = 100 paise)
    amount: {
      type: Number,
      required: true,
    },

    // Currency code — default is Indian Rupee
    currency: {
      type: String,
      default: 'INR',
    },

    // Payment status
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],  // Only these values allowed
      default: 'created',
    },
  },
  {
    // Mongoose will automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create the model from schema and export it
// 'Payment' → collection name in MongoDB will be 'payments'
module.exports = mongoose.model('Payment', paymentSchema);