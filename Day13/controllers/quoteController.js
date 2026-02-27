const Quote = require("../model/quotes");
/* CREATE */
exports.createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* GET ALL */
exports.getQuotes = async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
};

/* GET BY CATEGORY */
exports.getQuotesByCategory = async (req, res) => {
  const quotes = await Quote.find({ category: req.params.category });
  res.json(quotes);
};

/* GET SINGLE */
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* UPDATE */
exports.updateQuote = async (req, res) => {
  const updated = await Quote.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* DELETE */
exports.deleteQuote = async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: "Quote Deleted Successfully" });
};