// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/employees', {
                params: { search },
            });
            setEmployees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [search]);

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`);
                fetchEmployees();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Employee List</h2>
                <Link
                    to="/create-employee"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Employee
                </Link>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div>Total Count: {employees.length}</div>
                <div>
                    <label className="mr-2">Search</label>
                    <input
                        type="text"
                        placeholder="Enter Search Keyword"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Unique Id</th>
                        <th className="py-2 px-4 border">Image</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Mobile No</th>
                        <th className="py-2 px-4 border">Designation</th>
                        <th className="py-2 px-4 border">Gender</th>
                        <th className="py-2 px-4 border">Course</th>
                        <th className="py-2 px-4 border">Create Date</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.f_Id} className="text-center">
                            <td className="py-2 px-4 border">{emp.f_Id}</td>
                            <td className="py-2 px-4 border">
                                {emp.f_Image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${emp.f_Image}`}
                                        alt="Employee"
                                        className="h-12 w-12 mx-auto rounded-full"
                                    />
                                )}
                            </td>
                            <td className="py-2 px-4 border">{emp.f_Name}</td>
                            <td className="py-2 px-4 border">{emp.f_Email}</td>
                            <td className="py-2 px-4 border">{emp.f_Mobile}</td>
                            <td className="py-2 px-4 border">{emp.f_Designation}</td>
                            <td className="py-2 px-4 border">{emp.f_gender}</td>
                            <td className="py-2 px-4 border">{emp.f_Course.join(', ')}</td>
                            <td className="py-2 px-4 border">
                                {new Date(emp.f_Createdate).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border">
                                <Link
                                    to={`/edit-employee/${emp.f_Id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>{' '}
                                -{' '}
                                <button
                                    onClick={() => deleteEmployee(emp.f_Id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
