import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Auth.css';

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: 'namaUser' // kirim username ke metadata
        }
      }
    });

    if (error) {
      alert('Gagal daftar: ' + error.message);
    } else {
      alert('Berhasil daftar! Cek email jika perlu verifikasi.');
    }
  };

  return (
    <div className="auth-container">
      <h2>SIGN UP</h2>
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
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login" className="auth-link">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
