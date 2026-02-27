import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Quote as QuoteIcon, Heart, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserDashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [savedQuotes, setSavedQuotes] = useState([]);
    const [likedQuotes, setLikedQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('saved');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Since original User model stores ObjectIds, we need to populate them 
                // Alternatively we can fetch quotes and filter. Assuming backend has limited population right now
                // A better approach would be to update backend `getUserProfile` to populate.
                // Let's assume the backend `getUserProfile` is updated, or we fetch quotes that match IDs.

                const profileRes = await api.get('/users/profile');
                const profile = profileRes.data;

                // Simple workaround if backend doesn't populate: Fetch all quotes and filter
                const quotesRes = await api.get('/quotes'); // Getting first page of quotes
                const allQuotes = quotesRes.data.quotes;

                // This is a naive client-side filter for demo. 
                // Ideal approach: Dedicated GET /api/users/saved-quotes endpoint
                const saved = allQuotes.filter(q => profile.savedQuotes?.includes(q._id));
                const liked = allQuotes.filter(q => profile.likedQuotes?.includes(q._id));

                setSavedQuotes(saved);
                setLikedQuotes(liked);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const displayQuotes = activeTab === 'saved' ? savedQuotes : likedQuotes;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Profile */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4 text-shadow">
                            {user?.name?.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{user?.name}</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">{user?.email}</p>

                        <div className="space-y-4">
                            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-300">Saved</span>
                                <span className="font-bold text-primary-600">{user?.savedQuotes?.length || 0}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-300">Liked</span>
                                <span className="font-bold text-red-500">{user?.likedQuotes?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    <div className="flex space-x-4 mb-8">
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`px-6 py-2.5 rounded-full font-medium transition-colors ${activeTab === 'saved'
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <BookmarkCheck className="w-4 h-4 inline mr-2" />
                            Saved Quotes
                        </button>
                        <button
                            onClick={() => setActiveTab('liked')}
                            className={`px-6 py-2.5 rounded-full font-medium transition-colors ${activeTab === 'liked'
                                    ? 'bg-red-500 text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Heart className="w-4 h-4 inline mr-2" />
                            Liked Quotes
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">Loading collection...</div>
                    ) : displayQuotes.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                            <QuoteIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No quotes found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't {activeTab} any quotes yet.</p>
                            <Link to="/quotes" className="text-primary-600 hover:text-primary-700 font-medium pb-1 border-b border-primary-600">
                                Explore Quotes
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {displayQuotes.map(quote => (
                                <Link
                                    to={`/quote/${quote._id}`}
                                    key={quote._id}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 group flex flex-col"
                                >
                                    <p className="text-lg text-gray-800 dark:text-gray-200 mb-4 flex-grow">"{quote.text}"</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-gray-900 dark:text-white">{quote.author}</span>
                                        <span className="text-gray-400 group-hover:text-primary-500 transition-colors">Read more &rarr;</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;
