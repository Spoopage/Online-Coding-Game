import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

function ProfileManager() {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) console.error('Gagal fetch profiles:', error.message);
    else setProfiles(data);
  };

  const deleteProfile = async (id) => {
    await supabase.from('profiles').delete().eq('id', id);
    fetchProfiles();
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <h2>Profile Manager</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id}>
              <td>{p.email}</td>
              <td>{p.username}</td>
              <td>{p.role}</td>
              <td>
                <button onClick={() => deleteProfile(p.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileManager;
