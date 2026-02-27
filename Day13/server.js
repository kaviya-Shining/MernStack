const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quotes", require("./routes/quoteRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 Inspiro Quotes API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🔥 Server running on port ${PORT}`)
);