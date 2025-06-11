import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

function GameManager() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    submit_type: '',
    url: '',
  });

  const fetchGames = async () => {
    const { data, error } = await supabase.from('games').select('*');
    if (error) console.error('Gagal fetch games:', error.message);
    else setGames(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createGame = async () => {
    const { error } = await supabase.from('games').insert([form]);
    if (error) console.error('Insert gagal:', error.message);
    else {
      setForm({ title: '', author: '', description: '', submit_type: '', url: '' });
      fetchGames();
    }
  };

  const deleteGame = async (id) => {
    await supabase.from('games').delete().eq('id', id);
    fetchGames();
  };

  const updateGameTitle = async (id) => {
    const newTitle = prompt('Update Judul Game:');
    if (newTitle) {
      await supabase.from('games').update({ title: newTitle }).eq('id', id);
      fetchGames();
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Game Manager</h2>
      <div style={{ marginBottom: '10px' }}>
        <input name="title" placeholder="Judul" value={form.title} onChange={handleChange} />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <input name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} />
        <input name="submit_type" placeholder="Submit Type" value={form.submit_type} onChange={handleChange} />
        <input name="url" placeholder="Game URL (opsional)" value={form.url} onChange={handleChange} />
        <button onClick={createGame}>Tambah Game</button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Author</th>
            <th>Deskripsi</th>
            <th>Submit Type</th>
            <th>Detail</th>
            <th>Created At</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g) => (
            <tr key={g.id}>
              <td>{g.title}</td>
              <td>{g.author}</td>
              <td>{g.description}</td>
              <td>{g.submit_type}</td>
              <td>
                {g.submit_type === 'url' ? (
                  <a href={g.url} target="_blank" rel="noreferrer">Lihat URL</a>
                ) : (
                  <div style={{ textAlign: 'left' }}>
                    <div><strong>Framework:</strong> {g.framework_file}</div>
                    <div><strong>Data:</strong> {g.data_file}</div>
                    <div><strong>Code:</strong> {g.code_file}</div>
                    <div><strong>Loader:</strong> {g.loader_file}</div>
                  </div>
                )}
              </td>
              <td>{new Date(g.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => updateGameTitle(g.id)}>Edit</button>
                <button onClick={() => deleteGame(g.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameManager;
