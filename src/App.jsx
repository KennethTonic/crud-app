import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para sa HTTP request
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import UserList from './UserList';
import EditUser from './EditUser';
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setFeedback('Fetching data...');
    axios.get('https://finalproject.site/api/v1/users')
      .then(response => {
        setUsers(response.data);
        setFeedback('Data fetched successfully');
      })
      .catch(error => {
        setFeedback(`Error: ${error.message}`);
      })
      .finally(() => setTimeout(() => setFeedback(''), 3000));
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const closeEdit = () => {
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`https://finalproject.site/api/v1/users/${id}`)
        .then(() => fetchData())
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <AddUserForm fetchData={fetchData} />
      <UserList users={users} startEditing={startEditing} deleteUser={deleteUser} />
      {editingUser && <EditUserForm user={editingUser} fetchData={fetchData} closeEdit={closeEdit} />}
      {feedback && <p className={`feedback ${feedback.includes('Error') ? 'error' : 'success'}`}>{feedback}</p>}
    </div>
  );
};

export default App;
