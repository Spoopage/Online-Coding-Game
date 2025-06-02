import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('Login gagal: ' + error.message);
    } else {
      alert('Berhasil login!');
      // bisa redirect pakai navigate()
    }
  };

  return (
    <div className="auth-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
        <button type="submit" className="auth-button">Masuk</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Belum punya akun? <Link to="/signup" className="auth-link">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
