// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext.js';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />

                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
