// src/pages/SubmitGamePage.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './SubmitGamePage.css';
import { uploadToStorage } from '../utils/uploadToStorage';

const SubmitGamePage = () => {
    const navigate = useNavigate();
    const gameId = uuidv4();
    const basePath = `${gameId}/Build`;

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
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameId = uuidv4();
        const buildFolder = `${gameId}/Build`;
        let thumbnailUrl = null;

        try {
            // Upload Unity build files
            await uploadToStorage(formData.loaderFile, buildFolder, 'Build.loader.js');
            await uploadToStorage(formData.frameworkFile, buildFolder, 'Build.framework.js.unityweb');
            await uploadToStorage(formData.dataFile, buildFolder, 'Build.data.unityweb');
            await uploadToStorage(formData.wasmFile, buildFolder, 'Build.wasm.unityweb');

            // Upload optional thumbnail
            if (formData.image) {
                thumbnailUrl = await uploadToStorage(formData.image, gameId, 'thumbnail.png');
            }

            // Simpan metadata ke DB
            const { error: dbError } = await supabase.from('games').insert({
                id: gameId,
                title: formData.title,
                description: formData.description,
                base_path: `${gameId}/Build`,
                loader_file: 'Build.loader.js',
                framework_file: 'Build.framework.js.unityweb',
                data_file: 'Build.data.unityweb',
                code_file: 'Build.wasm.unityweb',
                // thumbnail_url: thumbnailUrl,
            });

            if (dbError) throw dbError;

            alert('Game berhasil diunggah!');
            navigate(`/game/${gameId}`);
        } catch (err) {
            console.error('Gagal upload:', err.message);
            alert('Gagal mengunggah game. Silakan coba lagi.');
        }
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
                    accept=".data.unityweb"
                    onChange={handleChange}
                />

                <label htmlFor="frameworkFile">File .framework.js</label>
                <input
                    type="file"
                    id="frameworkFile"
                    name="frameworkFile"
                    accept=".framework.js.unityweb"
                    onChange={handleChange}
                />

                <label htmlFor="loaderFile">File .loader</label>
                <input
                    type="file"
                    id="loaderFile"
                    name="loaderFile"
                    accept=".loader.js"
                    onChange={handleChange}
                />

                <label htmlFor="wasmFile">File .wasm</label>
                <input
                    type="file"
                    id="wasmFile"
                    name="wasmFile"
                    accept=".wasm.unityweb"
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SubmitGamePage;