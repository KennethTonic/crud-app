// src/components/EditUserForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, fetchData, closeEdit }) => {
  const [formData, setFormData] = useState({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    phone_number: user.phone_number,
    address: user.address,
    city: user.city,
    state: user.state,
    postal_code: user.postal_code,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      city: user.city,
      state: user.state,
      postal_code: user.postal_code,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check kung meron itong mga to sa baba
    if (!formData.fname || !formData.lname || !formData.email || !formData.phone_number || !formData.address || !formData.city || !formData.state || !formData.postal_code) {
      setError('All fields are required.');
      return;
    }

    axios.put(`https://finalproject.site/api/v1/users/${user.id}`, formData)
      .then(response => {
        console.log('User updated:', response.data);
        fetchData(); // Refresh user list
        closeEdit(); // Close the edit form
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        setError(`Error: ${error.response.data.message}`); // Show error to user
      });
  };

  return (
    <div>
      <h2>Edit User</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={handleInputChange} required />
        <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="tel" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
        <input type="text" name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleInputChange} required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserForm;
