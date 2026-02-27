const themes = [
  "Motivation",
  "Success",
  "Love",
  "Life",
  "Wisdom",
  "Leadership",
  "Happiness",
  "Productivity"
];

const authors = [
  "Unknown",
  "Albert Einstein",
  "Shakespeare",
  "Rumi",
  "Steve Jobs",
  "Confucius"
];

export const quotes = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  text: `Inspiro Premium Quote ${i + 1} – Elevate your mindset and embrace growth.`,
  author: authors[i % authors.length],
  theme: themes[i % themes.length]
}));