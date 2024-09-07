import React, { useState } from 'react';
import "../assets/css/Login.css";
import LOGO from "../assets/image/logo.jpg";
import VIEW from "../assets/image/view.jpg";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // ตั้งค่าเริ่มต้นเป็น false
    const [errors, setErrors] = useState({ username: '', password: '' });

    const validateForm = () => {
        let valid = true;
        let errors = {};

        // Validate username
        if (!username) {
            errors.username = 'กรุณากรอกชื่อผู้ใช้';
            valid = false;
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            errors.username = 'ชื่อผู้ใช้ควรประกอบด้วยตัวอักษรและตัวเลขเท่านั้น';
            valid = false;
        }

        // Validate password
        if (!password) {
            errors.password = 'กรุณากรอกรหัสผ่าน';
            valid = false;
        } else if (password.length < 8) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, a-z, A-Z, 0-9, อักขระพิเศษ';
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, a-z, A-Z, 0-9, อักขระพิเศษ';
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, a-z, A-Z, 0-9, อักขระพิเศษ';
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, a-z, A-Z, 0-9, อักขระพิเศษ';
            valid = false;
        } else if (!/[\W_]/.test(password)) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, a-z, A-Z, 0-9, อักขระพิเศษ';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            console.log('Username:', username);
            console.log('Password:', password);

            // Redirect to the specified URL after successful validation
            window.location.href = 'http://127.0.0.1:5000';
        }
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
                        type={showPassword ? "text" : "password"} // เปลี่ยน type ของ input ตามค่า showPassword
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // สลับสถานะ showPassword
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#007bff' // เพิ่มสีของปุ่ม
                        }}
                    >
                        {showPassword ? "ซ่อน" : "แสดง"} {/* แสดงข้อความตามสถานะ */}
                    </button>
                </div>

                <div className="input-group">
                    <div className='list-password'>
                        <div className='remember'>
                            <input type='checkbox' className='remem' />จำรหัสผ่าน
                        </div>
                        <div className='forgot'>
                            <a href="!#">ติดต่อเจ้าหน้าที่</a>
                        </div>
                    </div>
                </div>

                <button className="log" onClick={handleLogin}>เข้าสู่ระบบ</button>
            </div>
        </div>
    );
}

export default Login;
