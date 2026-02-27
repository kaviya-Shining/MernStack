import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link, useParams } from 'react-router-dom';
import { Search, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const QuotesExplorerPage = () => {
    const { categoryName, authorName } = useParams();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchQuotes = async (pageNum = 1, search = '') => {
        setLoading(true);
        try {
            let query = `/quotes?pageNumber=${pageNum}`;
            if (search) query += `&keyword=${search}`;
            // If we had category/author ID mapping we'd use it here. 
            // For now, relies on keyword search across text/author.

            const res = await api.get(query);
            if (pageNum === 1) {
                setQuotes(res.data.quotes);
            } else {
                setQuotes(prev => [...prev, ...res.data.quotes]);
            }
            setTotalPages(res.data.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes(1, searchTerm);
    }, [searchTerm, categoryName, authorName]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchQuotes(1, searchTerm);
    };

    const loadMore = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
            fetchQuotes(page + 1, searchTerm);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Inspirations</h1>
                    <p className="text-gray-500 text-lg">Discover quotes tailored to your mood</p>
                </div>

                <form onSubmit={handleSearch} className="mt-4 md:mt-0 relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search quotes, authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-none ring-1 ring-gray-200 shadow-sm focus:ring-2 focus:ring-primary-500 bg-white"
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                </form>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {quotes.map((quote, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        key={quote._id}
                        className="break-inside-avoid bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                    >
                        <QuoteCard quote={quote} />
                    </motion.div>
                ))}
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <div className="animate-pulse flex space-x-4">
                        <div className="h-3 w-3 bg-primary-400 rounded-full"></div>
                        <div className="h-3 w-3 bg-primary-400 rounded-full"></div>
                        <div className="h-3 w-3 bg-primary-400 rounded-full"></div>
                    </div>
                </div>
            )}

            {!loading && page < totalPages && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={loadMore}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}

            {!loading && quotes.length === 0 && (
                <div className="text-center py-20 text-gray-500 text-lg">
                    No quotes found. Try tweaking your search.
                </div>
            )}
        </div>
    );
};

const QuoteCard = ({ quote }) => {
    return (
        <Link to={`/quote/${quote._id}`} className="block">
            <h3 className="text-xl font-medium leading-relaxed text-gray-800 mb-6">
                "{quote.text}"
            </h3>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{quote.author}</span>
                    <span className="text-sm text-primary-600">{quote.category?.name || 'General'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                    <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                    <span className="text-sm font-medium">{quote.likesCount}</span>
                </div>
            </div>
        </Link>
    );
};

export default QuotesExplorerPage;
