// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        f_userName: '',
        f_Pwd: '',
    });
    const navigate = useNavigate();

    const { f_userName, f_Pwd } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('f_userName', res.data.f_userName);
            axios.defaults.headers.common['Authorization'] = res.data.token;
            navigate('/dashboard');
        } catch (err) {
            alert('Invalid login details');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">User Name</label>
                        <input
                            type="text"
                            name="f_userName"
                            value={f_userName}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="f_Pwd"
                            value={f_Pwd}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
