// db.js — MongoDB Connection using Mongoose
// This file handles connecting our Node.js app to MongoDB Atlas

const mongoose = require('mongoose');  // Import Mongoose ODM

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // mongoose.connect() returns a Promise — we use async/await
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    // If connection fails, log the error and exit the process
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);  // Exit with failure code
  }
};

module.exports = connectDB;  // Export the function for use in server.js