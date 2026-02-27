import { useContext } from "react";
import { QuoteContext } from "../context/QuoteContext";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import "../styles/global.css";

export default function Favorites() {
    const { initialQuotes, toggleLike } = useContext(QuoteContext);
    const favoriteQuotes = initialQuotes.filter(q => q.isLiked);

    return (
        <motion.div
            className="page-container favorites-page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
        >
            <div className="page-header">
                <h1>Your Favorites</h1>
                <p>A collection of quotes that inspire you.</p>
            </div>

            <div className="quotes-grid mt-8">
                {favoriteQuotes.length > 0 ? (
                    favoriteQuotes.map(quote => (
                        <motion.div
                            key={quote.id}
                            className="quote-card premium-card"
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="card-content">
                                <p className="main-quote">"{quote.text}"</p>
                                <div className="card-footer">
                                    <span className="author">— {quote.author}</span>
                                    <button
                                        className="like-btn liked"
                                        onClick={() => toggleLike(quote.id)}
                                    >
                                        <Heart size={18} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="empty-state">
                        <Heart size={48} className="empty-icon" />
                        <h3>No favorites yet</h3>
                        <p>Start liking quotes to see them appear here.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
