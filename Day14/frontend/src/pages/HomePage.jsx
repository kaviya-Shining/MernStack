import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Quote as QuoteIcon } from 'lucide-react';
import api from '../api/axios';

const HomePage = () => {
    const navigate = useNavigate();
    const [trending, setTrending] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendRes, catRes] = await Promise.all([
                    api.get('/quotes/trending'),
                    api.get('/categories')
                ]);
                setTrending(trendRes.data);
                setCategories(catRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8"
                    >
                        Words that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Inspire</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
                    >
                        Discover, save, and share a premium collection of profound quotes from great minds around the globe.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center space-x-4"
                    >
                        <button
                            onClick={() => navigate('/quotes')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium text-lg transition-all shadow-xl shadow-primary-500/30"
                        >
                            Explore Quotes
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            {!loading && categories.length > 0 && (
                <section className="py-20 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Browse by Category</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat, i) => (
                                <motion.div key={cat._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={`/quotes/category/${cat.name}`}
                                        className="px-6 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 rounded-full font-medium transition-all border border-gray-200 dark:border-gray-700 hover:border-primary-200 block shadow-sm"
                                    >
                                        {cat.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Trending Quotes Section */}
            {!loading && trending.length > 0 && (
                <section className="py-24 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold flex items-center text-gray-900 dark:text-white">
                                <QuoteIcon className="w-8 h-8 mr-3 text-primary-500" />
                                Trending
                            </h2>
                            <Link to="/quotes" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                                View all &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trending.map((quote, i) => (
                                <motion.div
                                    key={quote._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <p className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-6 flex-grow">
                                        "{quote.text}"
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-700">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 dark:text-white">{quote.author}</span>
                                            <span className="text-sm text-primary-600 dark:text-primary-400">{quote.category?.name || 'Inspiration'}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <Heart className="w-5 h-5 text-red-500 fill-current mr-1" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{quote.likesCount}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomePage;
