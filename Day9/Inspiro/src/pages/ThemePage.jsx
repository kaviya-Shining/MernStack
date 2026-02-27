import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { QuoteContext } from "../context/QuoteContext";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquareQuote } from "lucide-react";
import "../styles/global.css";

export default function ThemePage() {
  const { theme } = useParams();
  const { initialQuotes, toggleLike } = useContext(QuoteContext);

  const filtered = initialQuotes.filter(q => q.theme.toLowerCase() === theme.toLowerCase());

  return (
    <motion.div
      className="page-container theme-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header theme-header">
        <Link to="/home" className="back-btn">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="capitalize">{theme} Quotes</h1>
        <p>Explore our curated collection of {theme}-inspired thoughts.</p>
      </div>

      <div className="quotes-grid mt-8">
        {filtered.length > 0 ? (
          filtered.map((quote, index) => (
            <motion.div
              key={quote.id}
              className="quote-card premium-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="card-content">
                <p className="main-quote">"{quote.text}"</p>
                <div className="card-footer">
                  <span className="author">— {quote.author}</span>
                  <button
                    className={`like-btn ${quote.isLiked ? 'liked' : ''}`}
                    onClick={() => toggleLike(quote.id)}
                  >
                    <MessageSquareQuote size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-state">
            <MessageSquareQuote size={48} className="empty-icon" />
            <h3>No quotes found</h3>
            <p>We couldn't find any quotes for this theme.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}