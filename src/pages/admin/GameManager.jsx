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
    if (error) console.error('Failed to fetch games:', error.message);
    else setGames(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createGame = async () => {
    const { error } = await supabase.from('games').insert([form]);
    if (error) console.error('Insert failed:', error.message);
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
    const newTitle = prompt('Update Game Title:');
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
      
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <input 
              className="admin-input"
              name="title" 
              placeholder="Title" 
              value={form.title} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <input 
              className="admin-input"
              name="author" 
              placeholder="Author" 
              value={form.author} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <input 
              className="admin-input"
              name="description" 
              placeholder="Description" 
              value={form.description} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <input 
              className="admin-input"
              name="submit_type" 
              placeholder="Submit Type" 
              value={form.submit_type} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <input 
              className="admin-input"
              name="url" 
              placeholder="Game URL (optional)" 
              value={form.url} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <button className="admin-button" onClick={createGame}>Add Game</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Submit Type</th>
            <th>Details</th>
            <th>Created At</th>
            <th>Actions</th>
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
                  <a href={g.url} target="_blank" rel="noreferrer">View URL</a>
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
                <button className="admin-button" onClick={() => updateGameTitle(g.id)}>Edit</button>
                <button className="admin-button" onClick={() => deleteGame(g.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameManager;