import React, { useState } from 'react';
import "../assets/css/Login.css";
import LOGO from "../assets/image/logo.jpg";
import VIEW from "../assets/image/view.jpg";
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = '';
            valid = false;
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            errors.username = '';
            valid = false;
        }

        if (!password) {
            errors.password = '';
            valid = false;
        } else if (password.length < 8) {
            errors.password = 'กรุณากรอก "ชื่อผู้ใช้" หรือ "รหัสผ่าน" ให้ถูกต้อง!';
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'กรุณากรอก "ชื่อผู้ใช้" หรือ "รหัสผ่าน" ให้ถูกต้อง!';
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            errors.password = 'กรุณากรอก "ชื่อผู้ใช้" หรือ "รหัสผ่าน" ให้ถูกต้อง!';
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            errors.password = 'กรุณากรอก "ชื่อผู้ใช้" หรือ "รหัสผ่าน" ให้ถูกต้อง!';
            valid = false;
        } else if (!/[\W_]/.test(password)) {
            errors.password = 'กรุณากรอก "ชื่อผู้ใช้" หรือ "รหัสผ่าน" ให้ถูกต้อง!';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            // Simulate a login request
            if (username === 'Kitpanich' && password === 'rtv7410T!') {
                setSnackbarMessage('Login Successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                // เก็บชื่อผู้ใช้ใน Local Storage
                localStorage.setItem('username', username);

                setTimeout(() => navigate('/dashboard'), 2000); // Redirect after a short delay
            } else {
                setSnackbarMessage(' "ชื่อผู้ใช้"หรือ"รหัสผ่าน" ไม่ถูกต้อง!');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            // Display error message if validation fails
            setSnackbarMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }


    };

    const handleSignUpRedirect = () => {
        navigate('/signup');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="app-container">
            <img className='bg-img' src={VIEW} alt="background" />
            <div className="login-box">
                <div className="user-icon">
                    <img src={LOGO} alt="logo" />
                </div>
                <div className='text'>
                    <h2>สำนักงานตำรวจแห่งชาติ</h2>
                    <p>SMART TICKET</p>
                </div>

                <div className="input-group">
                    <label htmlFor="username"></label>
                    <input
                        placeholder='ชื่อผู้ใช้'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                <div className="input-group" style={{ position: 'relative' }}>
                    <label htmlFor="password"></label>
                    <input
                        placeholder='รหัสผ่าน'
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#007bff'
                        }}
                    >
                        {showPassword ? "ซ่อน" : "แสดง"}
                    </button>
                </div>

                <div className="input-group">
                    <div className='list-password'>
                        <div className='remember'>
                            <input type='checkbox' className='remem' />จำรหัสผ่าน
                        </div>
                        <div className='forgot'>
                            <a href="!#">ลืมรหัสผ่าน</a>
                        </div>
                    </div>
                </div>

                <button className="log" onClick={handleLogin}>เข้าสู่ระบบ</button>
                {/* <button className="sign-up" onClick={handleSignUpRedirect}>สร้างบัญชีใหม่</button> */}

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    className="snackbar-container" // เพิ่ม CSS class
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', fontSize: '1.15rem' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default Login;
