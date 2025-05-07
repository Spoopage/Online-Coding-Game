// src/pages/SubmitGamePage.jsx
import { useState } from 'react';
import './SubmitGamePage.css';

const SubmitGamePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        dataFile: null,
        frameworkFile: null,
        loaderFile: null,
        wasmFile: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else if (name === 'dataFile') {
            setFormData({ ...formData, dataFile: files[0] });
        } else if (name === 'frameworkFile') {
            setFormData({ ...formData, frameworkFile: files[0] });
        } else if (name === 'loaderFile') {
            setFormData({ ...formData, loaderFile: files[0] });
        } else if (name === 'wasmFile') {
            setFormData({ ...formData, wasmFile: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="submit-container">
            <h1>Submit Game Page</h1>

            <p className="tech-note">
                🔧 Pastikan game Anda dibangun dengan <strong>Unity version 2022.3.4++</strong> dan menggunakan <strong>Compression Brotli</strong> untuk performa terbaik.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Judul Game</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                />

                <label htmlFor="description">Deskripsi Game</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label htmlFor="image">
                    Gambar Game <span className="note">(Opsional)</span>
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />

                <label htmlFor="dataFile">File .data</label>
                <input
                    type="file"
                    id="dataFile"
                    name="dataFile"
                    accept=".data"
                    onChange={handleChange}
                />

                <label htmlFor="frameworkFile">File .framework.js</label>
                <input
                    type="file"
                    id="frameworkFile"
                    name="frameworkFile"
                    accept=".framework.js"
                    onChange={handleChange}
                />

                <label htmlFor="loaderFile">File .loader</label>
                <input
                    type="file"
                    id="loaderFile"
                    name="loaderFile"
                    accept=".loader"
                    onChange={handleChange}
                />

                <label htmlFor="wasmFile">File .wasm</label>
                <input
                    type="file"
                    id="wasmFile"
                    name="wasmFile"
                    accept=".wasm"
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SubmitGamePage;
