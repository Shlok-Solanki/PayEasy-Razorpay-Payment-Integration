# PayEasy — Razorpay Payment Integration

A simple online payment system built with Node.js, Express.js, MongoDB, and Razorpay.

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript ES6
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Payment:** Razorpay API

## Setup Instructions

1. Clone the repository
   git clone https://github.com/your-username/razorpay-payment-app.git
   cd razorpay-payment-app

2. Install dependencies
   npm install

3. Create .env file
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   RAZORPAY_KEY_ID=rzp_test_your_key
   RAZORPAY_KEY_SECRET=your_secret

4. Add your Razorpay Key ID in frontend/public/js/payment.js

5. Start the server
   npm run dev

6. Open http://localhost:5000 in your browser

## API Endpoints
- POST /api/payment/order    — Create Razorpay order
- POST /api/payment/verify   — Verify and save payment
- GET  /api/payment/history  — Get all payments