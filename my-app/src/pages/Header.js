import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
    return (
        <header className="bg-purple-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    MyApp
                </Link>
                <nav className="space-x-4">
                    <Link to="/profile" className="hover:text-sky-300 transition-colors">
                        Profile
                    </Link>
                    <button 
                        onClick={onLogout} 
                        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
