## 🛒 MERN Shopping App
A full-stack e-commerce application built with **MongoDB, Express, React, and Node.js**, featuring:
- User Authentication
- Product listing with category filter and search
- Cart with real-time updates (Socket.IO)
- Checkout and Order placement
- Order history tracking

## 📁 Project Structure
```
mern-shopping-app/
│
├── backend/
├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
|   |   ├── socket/
│   │   ├── utils/
│   │   └── app.js
│   └── package.json
│   └── .env


├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── slices/
│   │   ├── socket/
│   │   ├── store/
│   │   ├── utility/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│
├── index.html
├── package.json (root)
├── README.md
└── .gitignore
```
# 🚀 Features

🔐 **Authentication**
- Signup with validations (unique email)
- Login using JWT-based auth with access token
- Logout with token invalidation

🛍️ **Product Catalog**
- Categories: All, Fruits, Vegetables
- Search with category awareness
- Product details on click

🛒 **Cart (with Socket.IO)**
- Add/update/remove items from cart
- Real-time cart sync via WebSocket
- Client + server cart state sync

✅ **Checkout**
- Shows cart summary with images
- Shipping address form with validations
- Place order → show success animation
- Redirect to product page post-order

📦 **Orders**
- Orders saved to user profile
- Includes cart items, total amount, shipping details, and timestamp
- Order history available

## 🔧 Tech Stack

| Frontend        | Backend            |
| --------------- | ------------------ |
| React.js (Vite) | Node.js + Express  |
| Redux Toolkit   | MongoDB + Mongoose |
| Tailwind CSS    | JWT Auth           |
| Socket.IO       | bcrypt.js          |
| React Router    | dotenv             |


## 🖥️ Setup Instructions

📦** Backend Setup (/backend)**

**1. Create ```.env``` file** - Inside the root of backend folder
```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```
🧑‍🎨 **Frontend Setup (/frontend)** - No setup needed

## Install Dependencies
Inside the root folder of the app where the backend and frontend folder lies, run the following command
```
npm run install:all
```

## Run Server
In the root folder where you ran the command to install the dependencies, run another command
```
npm run dev
```

This command will run both the frontend and the backend server
Frontend will be available at http://localhost:5173
Backend will be available at http://localhost:3000

## ⚙️ Future Enhancements
- ✅ Toast notifications instead of alerts
- 🧾 Order history page
- 💳 Payment gateway integration
- 🛡️ Admin panel
- 🧪 Unit + Integration tests


## 👨‍💻 Author
**Developed with ❤️ by Prem**















