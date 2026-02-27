import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Flame, User, Settings, Bookmark } from "lucide-react";
import QuoteCard from "../components/QuoteCard";
import "../styles/global.css";

// Dummy data for dashboard
const savedQuotes = [
  { id: 1, text: "Every day is a second chance.", author: "Unknown", tags: ["Motivation"] },
  { id: 2, text: "Stay hungry, stay foolish.", author: "Steve Jobs", tags: ["Life"] },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuotes = savedQuotes.filter(q =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="page-container dashboard-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search saved quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        {/* User Space */}
        <div className="dashboard-card user-space">
          <div className="card-header">
            <User size={24} />
            <h2>User Profile</h2>
          </div>
          <div className="user-info">
            <div className="avatar">JD</div>
            <div>
              <h3>John Doe</h3>
              <p>Explorer of wisdom</p>
            </div>
          </div>
          <button className="btn-outline mt-4"><Settings size={16} /> Edit Profile</button>
        </div>

        {/* Streak */}
        <div className="dashboard-card streak-card">
          <div className="card-header highlight">
            <Flame size={24} color="#ff6b6b" />
            <h2>Your Streak</h2>
          </div>
          <div className="streak-content">
            <div className="streak-number">12</div>
            <p>days in a row!</p>
          </div>
          <div className="streak-progress">
            <div className="progress-bar" style={{ width: '60%' }}></div>
          </div>
          <p className="subtext">Keep it up! 3 days to your next milestone.</p>
        </div>
      </div>

      <div className="saved-section mt-8">
        <h2><Bookmark size={20} /> Saved Quotes</h2>
        <div className="quotes-grid">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map(quote => (
              <div key={quote.id} className="quote-mini-card">
                <p className="quote-text">"{quote.text}"</p>
                <span className="quote-author">- {quote.author}</span>
              </div>
            ))
          ) : (
            <div className="empty-state">No quotes found for "{searchQuery}"</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}