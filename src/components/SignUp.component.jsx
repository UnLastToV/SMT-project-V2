import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = 'กรุณากรอกชื่อผู้ใช้';
            valid = false;
        }

        if (!password) {
            errors.password = 'กรุณากรอกรหัสผ่าน';
            valid = false;
        } else if (password.length < 8) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, a-z, A-Z, 0-9, อักขระพิเศษ';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSignUp = async () => {
        if (validateForm()) {
            try {
                await axios.post('http://127.0.0.1:5000/api/auth/register', { username, password });
                navigate('/login'); // เปลี่ยนเส้นทางไปที่หน้า Login
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>สร้างบัญชีใหม่</h2>
            <div className="input-group">
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="input-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button onClick={handleSignUp}>สมัครสมาชิก</button>
        </div>
    );
}

export default SignUp;
