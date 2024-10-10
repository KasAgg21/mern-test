// src/components/EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const [formData, setFormData] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: [],
    });
    const [f_Image, setF_Image] = useState(null);
    const [existingImage, setExistingImage] = useState('');

    const navigate = useNavigate();
    const { id } = useParams(); // Use useParams to get the id from the URL

    const {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course,
    } = formData;

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setFormData({
                    f_Name: res.data.f_Name,
                    f_Email: res.data.f_Email,
                    f_Mobile: res.data.f_Mobile,
                    f_Designation: res.data.f_Designation,
                    f_gender: res.data.f_gender,
                    f_Course: res.data.f_Course,
                });
                setExistingImage(res.data.f_Image);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEmployee();
    }, [id]);

    const onChange = (e) => {
        if (e.target.name === 'f_Course') {
            const value = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData({ ...formData, f_Course: value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData((prevState) => ({
                ...prevState,
                f_Course: [...prevState.f_Course, value],
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                f_Course: prevState.f_Course.filter((course) => course !== value),
            }));
        }
    };

    const onFileChange = (e) => {
        setF_Image(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Client-side validations
        if (
            !f_Name ||
            !f_Email ||
            !f_Mobile ||
            !f_Designation ||
            !f_gender ||
            f_Course.length === 0
        ) {
            alert('Please fill in all fields');
            return;
        }

        if (!/^\d+$/.test(f_Mobile)) {
            alert('Mobile number must be numeric');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(f_Email)) {
            alert('Please enter a valid email');
            return;
        }

        const data = new FormData();
        data.append('f_Name', f_Name);
        data.append('f_Email', f_Email);
        data.append('f_Mobile', f_Mobile);
        data.append('f_Designation', f_Designation);
        data.append('f_gender', f_gender);

        // Append each course individually
        f_Course.forEach((course) => data.append('f_Course', course));

        if (f_Image) {
            data.append('f_Image', f_Image);
        }

        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, data);
            navigate('/employees');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.errors?.[0]?.msg || 'An error occurred');
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="f_Name"
                        value={f_Name}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="f_Email"
                        value={f_Email}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mobile No</label>
                    <input
                        type="text"
                        name="f_Mobile"
                        value={f_Mobile}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Designation</label>
                    <select
                        name="f_Designation"
                        value={f_Designation}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="f_gender"
                                value="Male"
                                checked={f_gender === 'Male'}
                                onChange={onChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="f_gender"
                                value="Female"
                                checked={f_gender === 'Female'}
                                onChange={onChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Course</label>
                    <div className="flex flex-col">
                        <label>
                            <input
                                type="checkbox"
                                name="f_Course"
                                value="MCA"
                                checked={f_Course.includes('MCA')}
                                onChange={onCheckboxChange}
                                className="mr-2"
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="f_Course"
                                value="BCA"
                                checked={f_Course.includes('BCA')}
                                onChange={onCheckboxChange}
                                className="mr-2"
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="f_Course"
                                value="BSC"
                                checked={f_Course.includes('BSC')}
                                onChange={onCheckboxChange}
                                className="mr-2"
                            />
                            BSC
                        </label>
                    </div>
                </div>
                <div>
                    <label>Existing Image</label>
                    {existingImage && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Existing Image</label>
                            <img
                                src={`http://localhost:5000/uploads/${existingImage}`}
                                alt="Employee"
                                className="h-24 w-24 rounded-full"
                            />
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Img Upload</label>
                    <input
                        type="file"
                        name="f_Image"
                        accept=".jpg,.png"
                        onChange={onFileChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditEmployee;
