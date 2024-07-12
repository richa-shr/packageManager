// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext.js';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentPackages from './pages/YourPackages.js';
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/your-package" element={<StudentPackages/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
