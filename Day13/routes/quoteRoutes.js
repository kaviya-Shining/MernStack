const express = require("express");
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuoteById,
  getQuotesByCategory,
  updateQuote,
  deleteQuote,
} = require("../controllers/quoteController");

router.post("/", createQuote);
router.get("/", getQuotes);
router.get("/category/:category", getQuotesByCategory);
router.get("/:id", getQuoteById);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

module.exports = router;