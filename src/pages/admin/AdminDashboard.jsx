import React from 'react';
import ProfileManager from './ProfileManager';
import GameManager from './GameManager';

function AdminDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <ProfileManager />
      <hr />
      <GameManager />
    </div>
  );
}

export default AdminDashboard;
