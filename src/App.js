import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.component';
import SignUp from './components/SignUp.component';
import Dashboard from './components/Dashboard.component'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
