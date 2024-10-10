// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const f_userName = localStorage.getItem('f_userName');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('f_userName');
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                <span className="text-white font-bold text-xl">Logo</span>
            </div>
            {f_userName && (
                <div className="flex items-center space-x-4">
                    <Link to="/dashboard" className="text-white hover:text-gray-200">
                        Home
                    </Link>
                    <Link to="/employees" className="text-white hover:text-gray-200">
                        Employee List
                    </Link>
                    <span className="text-white">{f_userName} -</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
