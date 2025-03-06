import React from "react";

const UserTable = ({ profile, isLoading, dataFetched }) => {
  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (!dataFetched) {
    return <p>Updating UI...</p>;
  }
  
  console.log("profiel", profile)

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>NRP</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {profile.length > 0 ? (
          profile.map((d, i) => (
            <tr key={i}>
              <td>{d.id_user}</td>
              <td>{d.user_name}</td>
              <td>{d.user_nrp}</td>
              <td>{d.user_email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
