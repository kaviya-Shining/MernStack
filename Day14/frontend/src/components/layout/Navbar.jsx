import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Quote, User, LogOut, Settings, LayoutDashboard, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Quote className="h-8 w-8 text-primary-600" />
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Inspiro</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <Link to="/quotes" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium transition-colors">
                            Explore
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4 ml-4">
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span className="hidden sm:inline">Admin</span>
                                    </Link>
                                )}
                                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 flex items-center space-x-1">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                                    Log in
                                </Link>
                                <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md shadow-primary-500/30">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
