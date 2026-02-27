import { Quote } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="flex items-center space-x-2 mb-4">
                    <Quote className="h-6 w-6 text-primary-600" />
                    <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Inspiro</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                    A premium collection of the world's most inspiring quotes to elevate your daily mindset.
                </p>
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 w-full flex justify-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Inspiro Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
