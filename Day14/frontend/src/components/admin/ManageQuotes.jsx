import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const fetchData = async () => {
        try {
            const [qRes, cRes] = await Promise.all([
                api.get('/quotes'),
                api.get('/categories')
            ]);
            setQuotes(qRes.data.quotes);
            setCategories(cRes.data);
            if (cRes.data.length > 0) setCategoryId(cRes.data[0]._id);
        } catch (err) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/quotes', { text, author, category: categoryId });
            toast.success("Quote added!");
            setText('');
            setAuthor('');
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add quote");
        }
    };

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <PlusCircle className="mr-2 text-primary-500" /> Manage Quotes
            </h2>

            <form onSubmit={handleCreate} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quote Text</label>
                    <input
                        required type="text" value={text} onChange={e => setText(e.target.value)}
                        className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                        placeholder="Enter quote here..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                    <input
                        required type="text" value={author} onChange={e => setAuthor(e.target.value)}
                        className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                        placeholder="e.g. Marcus Aurelius"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <div className="flex space-x-2">
                        <select
                            required value={categoryId} onChange={e => setCategoryId(e.target.value)}
                            className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm bg-white"
                        >
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 font-medium whitespace-nowrap">
                            Add
                        </button>
                    </div>
                </div>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quote</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                            <tr><td colSpan="2" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : quotes.map((quote) => (
                            <tr key={quote._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 max-w-md truncate">"{quote.text}"</td>
                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{quote.author}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageQuotes;
