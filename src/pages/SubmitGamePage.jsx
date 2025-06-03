import { useState } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import "./SubmitGamePage.css";

const SubmitGamePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    loaderFile: null,
    dataFile: null,
    frameworkFile: null,
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

    const gameId = uuidv4(); // ID unik untuk game
    const basePath = `${gameId}/Build`;

    const uploads = [
      { name: "loader_file", file: formData.loaderFile, filename: "Build.loader.js" },
      { name: "data_file", file: formData.dataFile, filename: "Build.data" },
      { name: "framework_file", file: formData.frameworkFile, filename: "Build.framework.js" },
      { name: "code_file", file: formData.wasmFile, filename: "Build.wasm" },
    ];

    try {
      // Upload setiap file ke Supabase Storage
      for (const item of uploads) {
        const { error } = await supabase.storage
          .from("games")
          .upload(`${basePath}/${item.filename}`, item.file);

        if (error) throw new Error(`Upload gagal: ${item.filename}`);
      }

      // Simpan metadata game ke database
      const { error: insertError } = await supabase.from("games").insert([
        {
          id: gameId,
          title: formData.title,
          description: formData.description,
          base_path: basePath,
          loader_file: "Build.loader.js",
          data_file: "Build.data",
          framework_file: "Build.framework.js",
          code_file: "Build.wasm",
        },
      ]);

      if (insertError) throw insertError;

      alert("Game berhasil diunggah!");
      window.location.href = `/game/${gameId}`;
    } catch (err) {
      console.error("Gagal upload game:", err.message);
      alert("Terjadi kesalahan saat mengunggah game.");
    }
  };

  return (
    <div className="submit-container">
      <h1>Submit Game</h1>
      <form onSubmit={handleSubmit}>
        <label>Judul Game</label>
        <input type="text" name="title" required onChange={handleChange} />

        <label>Deskripsi</label>
        <textarea name="description" required rows="3" onChange={handleChange} />

        <label>File Build.loader.js</label>
        <input type="file" name="loaderFile" accept=".js" required onChange={handleChange} />

        <label>File Build.data</label>
        <input type="file" name="dataFile" accept=".data" required onChange={handleChange} />

        <label>File Build.framework.js</label>
        <input type="file" name="frameworkFile" accept=".js" required onChange={handleChange} />

        <label>File Build.wasm</label>
        <input type="file" name="wasmFile" accept=".wasm" required onChange={handleChange} />

        <button type="submit">Upload Game</button>
      </form>
    </div>
  );
};

export default SubmitGamePage;
