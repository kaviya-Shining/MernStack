# 🌟 INSPIRO – MERN Stack Quotes Collection Application

A full-stack professional Quotes Collection Web Application built using the MERN Stack.

This project demonstrates:
- MongoDB database integration
- Express.js REST API
- React frontend
- Node.js backend server
- Full CRUD operations
- Professional project structure

---

# 🚀 TECH STACK

MERN =

M → MongoDB (Database)  
E → Express.js (Backend Framework)  
R → React.js (Frontend)  
N → Node.js (Runtime Environment)

---

# 📁 COMPLETE PROJECT STRUCTURE

```
inspiro/
│
├── backend/
│   ├── models/
│   │     └── Quote.js
│   ├── controllers/
│   │     └── quoteController.js
│   ├── routes/
│   │     └── quoteRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │     ├── components/
│   │     ├── pages/
│   │     ├── App.js
│   │     └── index.js
│   └── package.json
│
└── README.md
```

---

# 🛠️ BACKEND SETUP (STEP BY STEP)

## 1️⃣ Create Backend Folder

```
mkdir backend
cd backend
npm init -y
```

## 2️⃣ Install Required Packages

```
npm install express mongoose cors dotenv
npm install nodemon --save-dev
```

## 3️⃣ Update package.json Scripts

```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

# 🔐 Create .env File (Inside backend folder)

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inspiroDB
```

---

# 🧠 server.js

```js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log(err));

const quoteRoutes = require("./routes/quoteRoutes");
app.use("/api/quotes", quoteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

---

# 📦 models/Quote.js

```js
const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
```

---

# 🎯 controllers/quoteController.js

```js
const Quote = require("../models/Quote");

// CREATE
exports.createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ
exports.getQuotes = async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
};

// UPDATE
exports.updateQuote = async (req, res) => {
  const updatedQuote = await Quote.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedQuote);
};

// DELETE
exports.deleteQuote = async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: "Quote Deleted Successfully" });
};
```

---

# 🛣️ routes/quoteRoutes.js

```js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/quoteController");

router.post("/", controller.createQuote);
router.get("/", controller.getQuotes);
router.put("/:id", controller.updateQuote);
router.delete("/:id", controller.deleteQuote);

module.exports = router;
```

---

# ▶️ RUN BACKEND

```
npm run dev
```

Server will run at:
```
http://localhost:5000
```

---

# 📌 API ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/quotes        | Create Quote |
| GET    | /api/quotes        | Get All Quotes |
| PUT    | /api/quotes/:id    | Update Quote |
| DELETE | /api/quotes/:id    | Delete Quote |

---

# 🧪 TESTING USING POSTMAN

## ➤ CREATE (POST)

URL:
```
http://localhost:5000/api/quotes
```

Body (JSON):
```json
{
  "text": "Believe in yourself.",
  "author": "Unknown",
  "category": "Motivation"
}
```

---

# 🎨 FRONTEND SETUP (React)

## 1️⃣ Create React App

```
npx create-react-app frontend
cd frontend
npm start
```

---

# 📄 Example App.js

```js
import React, { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data));
  }, []);

  return (
    <div>
      <h1>Inspiro Quotes</h1>
      {quotes.map((quote) => (
        <div key={quote._id}>
          <p>{quote.text}</p>
          <h4>- {quote.author}</h4>
          <small>{quote.category}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
```

---

# 🔄 COMPLETE APPLICATION FLOW

React UI  
↓  
Fetch API Call  
↓  
Express Route  
↓  
Controller  
↓  
Mongoose  
↓  
MongoDB Database  
↓  
JSON Response  
↓  
React Updates UI  

---

# 🌟 ADVANCED IMPROVEMENTS

- Add JWT Authentication
- Add Admin Panel
- Add Pagination
- Add Search & Filter
- Deploy using MongoDB Atlas
- Deploy Backend using Render
- Deploy Frontend using Vercel

---

# 📚 IMPORTANT MONGODB COMMANDS (SHELL)

```
show dbs
use inspiroDB
show collections
db.quotes.find()
db.quotes.deleteMany({})
```

---

# 🏁 FINAL RESULT

✔ Full CRUD MERN Application  
✔ Clean Architecture  
✔ Production-Ready Structure  
✔ MongoDB Connected  
✔ React Frontend Connected  

---

# 👩‍💻 Author

Kaviya Rajasekaran  
CSE – 3rd Year  

---

# 📜 License

This project is open-source for educational purposes.