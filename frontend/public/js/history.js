// history.js — Payment History Page Logic
// Fetches all payment records from MongoDB via our API and displays them

// ES6: Immediately Invoked Async Function (runs as soon as page loads)
const loadPaymentHistory = async () => {
  const loadingDiv = document.getElementById('loading');
  const historyContainer = document.getElementById('history-container');
  const historyBody = document.getElementById('history-body');
  const noDataDiv = document.getElementById('no-data');

  try {
    // Fetch payment history from our backend API
    const response = await fetch('/api/payment/history');
    const payments = await response.json();

    // Hide loading indicator
    loadingDiv.classList.add('hidden');

    if (payments.length === 0) {
      // No payments found
      noDataDiv.classList.remove('hidden');
      return;
    }

    // Build table rows using ES6 map() and template literals
    const rows = payments.map((payment, index) => {
      // Convert paise back to rupees for display
      const amountInRupees = (payment.amount / 100).toFixed(2);

      // Format date nicely
      const date = new Date(payment.createdAt).toLocaleString('en-IN');

      // Shorten IDs for display (first 16 characters)
      const shortOrderId = payment.razorpayOrderId.slice(0, 16) + '...';
      const shortPaymentId = payment.razorpayPaymentId
        ? payment.razorpayPaymentId.slice(0, 16) + '...'
        : '—';  // Show dash if no payment ID yet

      // Return HTML for one table row (template literal)
      return `
        <tr>
          <td>${index + 1}</td>
          <td title="${payment.razorpayOrderId}">${shortOrderId}</td>
          <td title="${payment.razorpayPaymentId}">${shortPaymentId}</td>
          <td>₹${amountInRupees}</td>
          <td>
            <span class="status-badge ${payment.status}">
              ${payment.status.toUpperCase()}
            </span>
          </td>
          <td>${date}</td>
        </tr>
      `;
    });

    // Join all rows and insert into table
    historyBody.innerHTML = rows.join('');

    // Show the table
    historyContainer.classList.remove('hidden');

  } catch (error) {
    loadingDiv.textContent = '❌ Error loading history. Please try again.';
    console.error('History fetch error:', error.message);
  }
};

// Call the function when page loads
loadPaymentHistory();