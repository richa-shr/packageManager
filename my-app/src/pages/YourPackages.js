import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Header from './Header.js'
const StudentPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPackages = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.get('http://localhost:8080/package/student', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            setPackages(response.data.yourPackages);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
    };
    useEffect(() => {
        fetchPackages();
    }, []);

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <>
        <Header onLogout={handleLogout} />
        <div className="container mx-auto mt-8 bg-sky-50 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-purple-700 text-center">Your Packages</h1>
            <ul className="space-y-4">
                {packages.map((pkg) => (
                    <li key={pkg._id} className="bg-white shadow-md rounded-lg p-4 border border-purple-200 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold mb-2 text-purple-700">{pkg.name}</h3>
                        <p className="text-gray-600 mb-2">Arrival Date: {moment(pkg.dateOfArrival).format('YYYY-MM-DD')}</p>
                        <p className="text-gray-600">Is Taken: {pkg.isTaken ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default StudentPackages;
