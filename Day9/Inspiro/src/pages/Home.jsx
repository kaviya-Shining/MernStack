import { motion } from "framer-motion";
import { Heart, Grid, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const featuredQuotes = [
    { id: 101, text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", isLiked: true },
    { id: 102, text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", isLiked: false },
    { id: 103, text: "It is never too late to be what you might have been.", author: "George Eliot", isLiked: true }
];

const themes = [
    { name: "Motivation", color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" },
    { name: "Wisdom", color: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" },
    { name: "Success", color: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" },
    { name: "Love", color: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)" }
];

export default function Home() {
    return (
        <motion.div
            className="page-container home-page"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="hero-section">
                <h1>Discover Inspiration</h1>
                <p>Curated quotes to brighten your day and spark your creativity.</p>
            </div>

            <section className="section-block mt-8">
                <div className="section-header">
                    <h2><Quote size={20} /> Daily Picks</h2>
                </div>
                <div className="quotes-grid">
                    {featuredQuotes.map(quote => (
                        <motion.div
                            key={quote.id}
                            className="quote-card premium-card"
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="card-content">
                                <p className="main-quote">"{quote.text}"</p>
                                <div className="card-footer">
                                    <span className="author">— {quote.author}</span>
                                    <button className={`like-btn ${quote.isLiked ? 'liked' : ''}`}>
                                        <Heart size={18} fill={quote.isLiked ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="section-block mt-8">
                <div className="section-header">
                    <h2><Grid size={20} /> Explore by Theme</h2>
                </div>
                <div className="themes-grid">
                    {themes.map(theme => (
                        <Link to={`/theme/${theme.name.toLowerCase()}`} key={theme.name}>
                            <motion.div
                                className="theme-card"
                                style={{ background: theme.color }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3>{theme.name}</h3>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="section-block mt-8">
                <div className="section-header">
                    <h2><Heart size={20} /> Your Recent Likes</h2>
                    <Link to="/favorites" className="view-all">View All</Link>
                </div>
                <div className="likes-collection horizontal-scroll">
                    {featuredQuotes.filter(q => q.isLiked).map(quote => (
                        <div key={quote.id} className="small-like-card">
                            <p>"{quote.text.substring(0, 40)}..."</p>
                            <Heart size={14} className="liked-icon" fill="currentColor" />
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
