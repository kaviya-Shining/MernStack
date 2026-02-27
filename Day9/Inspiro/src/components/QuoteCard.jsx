import "../styles/card.css";
import { useContext } from "react";
import { QuoteContext } from "../context/QuoteContext";

export default function QuoteCard({ quote }) {
  const { addFavorite } = useContext(QuoteContext);

  return (
    <div className="quote-card">
      <p>{quote.text}</p>
      <div className="quote-author">- {quote.author}</div>

      <div className="actions">
        <span className="badge">{quote.theme}</span>
        <span className="heart" onClick={() => addFavorite(quote)}>❤️</span>
      </div>
    </div>
  );
}