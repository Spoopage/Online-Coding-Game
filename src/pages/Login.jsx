import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login berhasil (simulasi)');
    };

    return (
        <div className="auth-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
            <input
            className="auth-input"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            />
            <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
            <button type="submit" className="auth-button">LOGIN</button>
        </form>
        <p style={{ marginTop: '15px' }}>
            Belum punya akun? <Link to="/signup" className="auth-link">DAFTAR</Link>
        </p>
        </div>
    );
}

export default Login;
