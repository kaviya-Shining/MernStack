import { useState, useEffect } from 'react';
import api from '../api/axios';
import ManageQuotes from '../components/admin/ManageQuotes';
import ManageCategories from '../components/admin/ManageCategories';

const AdminDashboardPage = () => {
    const [analytics, setAnalytics] = useState({ totalUsers: 0, totalQuotes: 0, totalCategories: 0 });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/users/analytics');
                setAnalytics(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-500">Total Quotes</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalQuotes}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Categories</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{analytics.totalCategories}</p>
                </div>
            </div>

            <ManageQuotes />
            <ManageCategories />
        </div>
    );
};

export default AdminDashboardPage;
