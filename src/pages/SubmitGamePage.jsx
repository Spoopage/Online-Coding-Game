import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import "./SubmitGamePage.css";

function SubmitGamePage() {
  const [submitType, setSubmitType] = useState("upload");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setExternalUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);


  useEffect(() => {
    setFiles({});
  }, [submitType]);

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const uploadFileToSupabase = async (file, path) => {
    const { error } = await supabase.storage.from("games").upload(path, file);
    if (error) throw error;
  };

  const uploadImageToSupabase = async (file, path) => {
    const { error } = await supabase.storage.from("games").upload(path, file);
    if (error) throw error;
    return path; // Return the file path to store in the database
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const gameId = uuidv4();
    let imageUrl = "";

    try {
      if (image) {
        const imagePath = `${gameId}/thumbnail/${image.name}`;
        imageUrl = await uploadImageToSupabase(image, imagePath);
      }

      if (submitType === "upload") {
        const basePath = `${gameId}/Build`;
        await Promise.all([
          uploadFileToSupabase(files.loader, `${basePath}/${files.loader.name}`),
          uploadFileToSupabase(files.framework, `${basePath}/${files.framework.name}`),
          uploadFileToSupabase(files.data, `${basePath}/${files.data.name}`),
          uploadFileToSupabase(files.code, `${basePath}/${files.code.name}`)
        ]);

        const { error: insertError } = await supabase.from("games").insert({
          id: gameId,
          title,
          description,
          author,
          thumbnail_url: imageUrl,
          submit_type: "upload",
          base_path: basePath,
          loader_file: files.loader.name,
          framework_file: files.framework.name,
          data_file: files.data.name,
          code_file: files.code.name
        });

        if (insertError) throw insertError;
      } else if (submitType === "url") {
        const { error: insertError } = await supabase.from("games").insert({
          id: gameId,
          title,
          description,
          author,
          thumbnail_url: imageUrl,
          submit_type: "url",
          url: url
        });

        if (insertError) throw insertError;
      } else if (submitType === "iframe") {
        const { error: insertError } = await supabase.from("games").insert({
          id: gameId,
          title,
          description,
          author,
          thumbnail_url: imageUrl,
          submit_type: "iframe",
          iframe_embed: iframeUrl
        });

        if (insertError) throw insertError;
      }

      alert("Game submitted successfully!");
      setTitle("");
      setDescription("");
      setAuthor("");
      setExternalUrl("");
      setIframeUrl("");
      setFiles({});
      setImage(null);
    } catch (err) {
      console.error("Error submitting game:", err);
      alert("Submission failed. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="submit-game-page">
      <h2>Submit Your Game</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Game Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your game title"
          />
        </div>

        <div>
          <label>Author Name *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Enter author's name"
          />
        </div>

        <div>
          <label>Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleImageChange}
          />
          <span className="note">(.jpg, .png, .jpeg)</span>
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your game (optional)"
          />
        </div>

        <div>
          <label>Submission Method *</label>
          <select
            value={submitType}
            onChange={(e) => setSubmitType(e.target.value)}
          >
            <option value="upload">Upload Game Files</option>
            <option value="url">External Game URL</option>
            <option value="iframe">Embed via iframe</option>
          </select>
        </div>

        {submitType === "upload" && (
          <div className="file-inputs">
            <div>
              <label>Loader File *</label>
              <input
                type="file"
                name="loader"
                onChange={handleFileChange}
                required
              />
              <span className="note">(.html file)</span>
            </div>

            <div>
              <label>Framework File *</label>
              <input
                type="file"
                name="framework"
                onChange={handleFileChange}
                required
              />
              <span className="note">(.js file)</span>
            </div>

            <div>
              <label>Data File *</label>
              <input
                type="file"
                name="data"
                onChange={handleFileChange}
                required
              />
              <span className="note">(.data file)</span>
            </div>

            <div>
              <label>Code File (WASM) *</label>
              <input
                type="file"
                name="code"
                onChange={handleFileChange}
                required
              />
              <span className="note">(.wasm file)</span>
            </div>
          </div>
        )}

        {submitType === "url" && (
          <div>
            <label>Game URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setExternalUrl(e.target.value)}
              required
              placeholder="https://example.com/game"
            />
          </div>
        )}

        {submitType === "iframe" && (
          <div>
            <label>iframe Embed URL *</label>
            <input
              type="url"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              required
              placeholder="https://example.com/game/embed"
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Game"}
        </button>
      </form>
    </div>
  );
}

export default SubmitGamePage;