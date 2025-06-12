import React from 'react';
import ProfileManager from './ProfileManager';
import GameManager from './GameManager';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ProfileManager />
      <hr className="admin-divider" />
      <GameManager />
    </div>
  );
}

export default AdminDashboard;