// payment.js — Frontend Payment Logic
// This file handles: form validation → create order → Razorpay checkout → verify

// ES6: async/await, const/let, arrow functions, fetch API

// Main function called when "Pay Now" button is clicked
const initiatePayment = async () => {
  // ES6: const for values that don't change
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const statusDiv = document.getElementById('status-message');
  const payBtn = document.getElementById('pay-btn');

  // ── Validation ──────────────────────────────
  if (!name || !email || !amount) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  if (amount <= 0 || isNaN(amount)) {
    showStatus('Please enter a valid amount.', 'error');
    return;
  }

  // Disable button to prevent double clicks
  payBtn.disabled = true;
  payBtn.textContent = 'Creating order...';

  try {
    // ── STEP 1: Call our backend to create a Razorpay Order ──
    // Using Fetch API (ES6 Promises under the hood)
    const response = await fetch('/api/payment/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Tell server we're sending JSON
      },
      body: JSON.stringify({ amount: Number(amount) }),  // Send amount in ₹
    });

    const orderData = await response.json();

    if (!response.ok) {
      throw new Error(orderData.message || 'Could not create order');
    }

    // ── STEP 2: Configure and Open Razorpay Checkout Popup ──
    console.log("Order Data:", orderData);
    const options = {
      key: 'rzp_test_Sxzyq0Q6RrNs58',  // ← Replace with your rzp_test_... key
      amount: orderData.amount,                 // Amount in paise (from backend)
      currency: orderData.currency,
      name: 'PayEasy',                          // Your app name shown in popup
      description: 'Test Payment',
      order_id: orderData.orderId,              // Order ID from backend

      // ── SUCCESS HANDLER (Arrow Function) ──
      handler: async (response) => {
        // This runs when user successfully completes payment

        payBtn.textContent = 'Verifying payment...';

        try {
          // ── STEP 3: Send payment details to backend for verification ──
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            // Payment verified and saved in MongoDB!
            showStatus('✅ Payment Successful! Redirecting to history...', 'success');

            // Redirect to history page after 2 seconds
            setTimeout(() => {
              window.location.href = 'history.html';
            }, 2000);
          } else {
            showStatus('❌ Payment verification failed.', 'error');
          }
        } catch (verifyError) {
          showStatus('❌ Error verifying payment.', 'error');
        }
      },

      // Pre-fill user info in the Razorpay popup
      prefill: {
        name: name,
        email: email,
      },

      theme: {
        color: '#2563eb',  // Match our app's primary color
      },
    };

    // Create and open the Razorpay checkout popup
    const rzp = new Razorpay(options);
    rzp.open();

    // If user closes the popup without paying
    rzp.on('payment.failed', (response) => {
      showStatus('❌ Payment was cancelled or failed.', 'error');
    });

  } catch (error) {
    showStatus(`❌ Error: ${error.message}`, 'error');
  } finally {
    // Re-enable button regardless of success or failure
    payBtn.disabled = false;
    payBtn.textContent = 'Pay Now with Razorpay 🚀';
  }
};


// Helper function to show status messages
// ES6 Arrow Function
const showStatus = (message, type) => {
  const statusDiv = document.getElementById('status-message');
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${type}`;  // Template literal
  statusDiv.classList.remove('hidden');
};