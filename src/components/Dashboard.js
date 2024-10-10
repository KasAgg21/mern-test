// src/components/Dashboard.js
import React from 'react';

const Dashboard = () => {
    const f_userName = localStorage.getItem('f_userName');

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Admin Panel</h1>
            <p className="text-gray-700">Logged in as: {f_userName}</p>
        </div>
    );
};

export default Dashboard;
