# 💳 PayEasy - Razorpay Payment Integration

A full-stack payment gateway integration project built using **Node.js, Express.js, MongoDB Atlas, and Razorpay**.

PayEasy allows users to make secure online payments through Razorpay, verifies transactions using payment signatures, and stores payment records in MongoDB Atlas for future reference.

---

## 🚀 Features

* 💳 Razorpay Payment Gateway Integration
* 🔐 Secure Payment Verification
* 🗄️ MongoDB Atlas Database Storage
* 📜 Payment History Tracking
* 🎨 Modern Responsive UI
* ⚡ Real-time Payment Processing
* 🌐 REST API Backend using Express.js

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Payment Gateway

* Razorpay

---

## 📂 Project Structure

```text
PayEasy/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── paymentController.js
│   ├── models/
│   │   └── Payment.js
│   ├── routes/
│   │   └── paymentRoutes.js
│   └── server.js
│
├── frontend/
│   └── public/
│       ├── css/
│       │   └── styles.css
│       ├── js/
│       │   ├── payment.js
│       │   └── history.js
│       ├── index.html
│       ├── payment.html
│       └── history.html
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/Shlok-Solanki/PayEasy-Razorpay-Payment-Integration.git
cd PayEasy-Razorpay-Payment-Integration
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

RAZORPAY_KEY_ID=your_razorpay_key_id

RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Start Application

```bash
npm run dev
```

Server will start on:

```text
http://localhost:5000
```

---

## 💳 Payment Flow

1. User enters payment details.
2. Backend creates a Razorpay order.
3. Razorpay Checkout opens.
4. User completes payment.
5. Backend verifies Razorpay signature.
6. Transaction is stored in MongoDB Atlas.
7. Payment history can be viewed on the History page.

---

## 🔒 Security Features

* Environment variables stored in `.env`
* Razorpay HMAC Signature Verification
* MongoDB Atlas Secure Cloud Database
* Sensitive credentials excluded using `.gitignore`

---

## 📸 Screenshots

### Home Page

<img width="1917" height="908" alt="image" src="https://github.com/user-attachments/assets/69730d9d-df06-45a8-9f75-8a0b45faf027" />
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/e88db89a-d7ea-4ca1-af6d-a79738182822" />



### Payment Page

<img width="1917" height="1024" alt="image" src="https://github.com/user-attachments/assets/09945491-e2b8-4031-b968-329971771577" />


### Razorpay Checkout

<img width="1917" height="1019" alt="image" src="https://github.com/user-attachments/assets/e759c6c6-4e83-4911-adeb-929e8fa84b05" />


### Payment History

<img width="1918" height="905" alt="image" src="https://github.com/user-attachments/assets/9c037249-b4d9-470e-916b-02439f7d5a8a" />


---

## 🎓 Academic Information

**Project Title:** Razorpay Payment Integration

**Course:** Advanced Web Development

**Technology Used:** Node.js, Express.js, MongoDB Atlas, Razorpay

**Developed By:** Shlok Solanki

**College:** Noida Institute of Engineering & Technology (NIET)

---

## 📄 License

This project is developed for educational and learning purposes.
