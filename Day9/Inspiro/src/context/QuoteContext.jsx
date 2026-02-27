import { createContext, useState, useEffect } from "react";
import { quotes as initialData } from "../data/quotes";

export const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [initialQuotes, setInitialQuotes] = useState(
    initialData.map(q => ({ ...q, isLiked: false }))
  );

  const toggleLike = (id) => {
    setInitialQuotes(prev =>
      prev.map(q => q.id === id ? { ...q, isLiked: !q.isLiked } : q)
    );
  };

  return (
    <QuoteContext.Provider value={{ initialQuotes, toggleLike }}>
      {children}
    </QuoteContext.Provider>
  );
};