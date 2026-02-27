import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Tag, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/categories', { name, description });
            toast.success("Category added!");
            setName('');
            setDescription('');
            fetchCategories();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add category");
        }
    };

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <Tag className="mr-2 text-primary-500" /> Manage Categories
            </h2>

            <form onSubmit={handleCreate} className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
                    <input
                        required type="text" value={name} onChange={e => setName(e.target.value)}
                        className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                        placeholder="e.g. Stoicism"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
                    <input
                        type="text" value={description} onChange={e => setDescription(e.target.value)}
                        className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                        placeholder="Brief description"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 font-medium flex items-center justify-center">
                        <PlusCircle className="w-5 h-5 mr-2" /> Add Category
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {loading ? (
                    <div className="col-span-full text-center py-4">Loading...</div>
                ) : categories.map((cat) => (
                    <div key={cat._id} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg p-4 text-center shadow-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                        {cat.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCategories;
