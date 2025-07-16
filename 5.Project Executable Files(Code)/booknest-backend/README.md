# 🔙 BookNest Backend

This is the backend server for the BookNest application. It handles authentication, book listings, cart, wishlist, and orders using **Express** and **MongoDB**.

---

## 🚀 Getting Started

### 1. Navigate to Backend Folder

```bash
cd booknest-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the backend root with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://booknest:BookNest123!@booknest.gt7dyrf.mongodb.net/booknest?retryWrites=true&w=majority&appName=BookNest
JWT_SECRET=your_secret_key_here
```

---

### 4. Start the Server

```bash
node server.js
```

Server will run at:  
📍 `http://localhost:5000`

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer (for image uploads)
- JWT (for authentication)

