import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Heart, BookmarkPlus, ArrowLeft, BookmarkCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SingleQuotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    // To properly show if user liked/saved, we'd need that in context or profile fetch.
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await api.get(`/quotes/${id}`);
                setQuote(res.data);

                if (user) {
                    setLiked(user.likedQuotes?.includes(id));
                    setSaved(user.savedQuotes?.includes(id));
                }
            } catch (err) {
                toast.error('Quote not found');
            } finally {
                setLoading(false);
            }
        };
        fetchQuote();
    }, [id, user]);

    const handleLike = async () => {
        if (!user) return toast.error("Please login to like quotes");
        try {
            const res = await api.put(`/quotes/${id}/like`);
            setLiked(!liked);
            setQuote({ ...quote, likesCount: res.data.likesCount });
        } catch (err) {
            toast.error("Error toggling like");
        }
    };

    const handleSave = async () => {
        if (!user) return toast.error("Please login to save quotes");
        try {
            await api.put(`/quotes/${id}/save`);
            setSaved(!saved);
            toast.success(saved ? 'Quote unsaved' : 'Quote saved');
        } catch (err) {
            toast.error("Error toggling save");
        }
    };

    if (loading) return <div className="min-h-screen pt-32 flex justify-center">Loading...</div>;
    if (!quote) return <div className="min-h-screen pt-32 text-center text-xl">Quote not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-12 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-medium leading-tight text-gray-900 mb-10 relative z-10">
                        "{quote.text}"
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-8 relative z-10">
                        <div className="flex items-center space-x-4 mb-6 sm:mb-0">
                            <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-xl uppercase">
                                {quote.author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-xl text-gray-900">{quote.author}</p>
                                <p className="text-primary-600 font-medium">{quote.category?.name || 'Inspiration'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all ${liked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                                <span className="font-semibold">{quote.likesCount}</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className={`flex items-center justify-center w-11 h-11 rounded-full transition-all ${saved ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {saved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleQuotePage;
