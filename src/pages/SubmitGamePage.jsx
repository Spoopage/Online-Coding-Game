import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

function SubmitGamePage() {
  const [submitType, setSubmitType] = useState("upload"); // upload | url | iframe
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const uploadFileToSupabase = async (file, path) => {
    const { error } = await supabase.storage.from("games").upload(path, file);
    if (error) throw error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const gameId = uuidv4();

    try {
      if (submitType === "upload") {
        const basePath = `${gameId}/Build`;
        await Promise.all([
          uploadFileToSupabase(files.loader, `${basePath}/${files.loader.name}`),
          uploadFileToSupabase(files.framework, `${basePath}/${files.framework.name}`),
          uploadFileToSupabase(files.data, `${basePath}/${files.data.name}`),
          uploadFileToSupabase(files.code, `${basePath}/${files.code.name}`)
        ]);

        await supabase.from("games").insert({
          id: gameId,
          title,
          description,
          submit_type: "upload",
          base_path: basePath,
          loader_file: files.loader.name,
          framework_file: files.framework.name,
          data_file: files.data.name,
          code_file: files.code.name
        });
      } else if (submitType === "url") {
        await supabase.from("games").insert({
          id: gameId,
          title,
          description,
          submit_type: "url",
          external_loader_url: externalUrl
        });
      } else if (submitType === "iframe") {
        await supabase.from("games").insert({
          id: gameId,
          title,
          description,
          submit_type: "iframe",
          iframe_embed_url: iframeUrl
        });
      }

      alert("Game submitted successfully!");
    } catch (err) {
      console.error("Error submitting game:", err);
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-game-page">
      <h2>Submit Game</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Submit Method</label>
        <select value={submitType} onChange={(e) => setSubmitType(e.target.value)}>
          <option value="upload">Upload Files</option>
          <option value="url">From External URL</option>
          <option value="iframe">Embed via iframe</option>
        </select>

        {submitType === "upload" && (
          <div className="file-inputs">
            <label>Loader File</label>
            <input type="file" name="loader" onChange={handleFileChange} required />

            <label>Framework File</label>
            <input type="file" name="framework" onChange={handleFileChange} required />

            <label>Data File</label>
            <input type="file" name="data" onChange={handleFileChange} required />

            <label>Code File (wasm)</label>
            <input type="file" name="code" onChange={handleFileChange} required />
          </div>
        )}

        {submitType === "url" && (
          <>
            <label>Loader URL</label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              required
            />
          </>
        )}

        {submitType === "iframe" && (
          <>
            <label>iframe Embed URL</label>
            <input
              type="url"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Game"}
        </button>
      </form>
    </div>
  );
}

export default SubmitGamePage;
