// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data from API endpoint
  const fetchData = () => {
    setLoading(true);
    axios.get('https://finalproject.site/api/v1/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load users.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Para sa Edit user
  const handleEdit = (user) => {
    // Logic ng edit user
    console.log('Edit user:', user);
    // posibleng ma-update ung state o tatawag ng API call to edit the user
  };

  // Para sa delete user
  const handleDelete = (userId) => {
    axios.delete(`https://finalproject.site/api/v1/users/${userId}`)
      .then(response => {
        console.log('User deleted:', response.data);
        fetchData(); // Refresh the user list
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.postal_code}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
