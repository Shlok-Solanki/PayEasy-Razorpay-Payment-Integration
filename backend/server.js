// server.js — Main Entry Point of the Application
// This file starts the Express server

// Load environment variables from .env file FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');         // Built-in Node.js path module
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');

// Connect to MongoDB before starting server
connectDB();

// Create Express application
const app = express();

// ─── MIDDLEWARE ───────────────────────────────
// Middleware runs on every request before reaching routes

// Allow Cross-Origin requests (frontend calling backend API)
app.use(cors());

// Parse incoming JSON request bodies (req.body)
app.use(express.json());

// Serve static files from frontend/public folder
// This lets Express serve index.html, style.css, etc.
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ─── ROUTES ──────────────────────────────────
// Mount payment routes under /api/payment prefix
app.use('/api/payment', paymentRoutes);

// ─── CATCH-ALL ROUTE ─────────────────────────
// For any other URL, serve the index.html (Single Page feel)
// ✅ New syntax — works in Express 5
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// ─── START SERVER ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});