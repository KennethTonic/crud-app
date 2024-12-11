import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = () => {
  const { userId } = useParams(); // Extract user ID from URL
  const history = useHistory();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    postal_code: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://finalproject.site/api/v1/users/${userId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://finalproject.site/api/v1/users/${userId}`, formData);
      history.push('/'); // Navigate back to the user list page after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" value={formData.fname} onChange={handleInputChange} placeholder="First Name" required />
        <input type="text" name="lname" value={formData.lname} onChange={handleInputChange} placeholder="Last Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} placeholder="Phone Number" required />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" required />
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
        <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" required />
        <input type="text" name="postal_code" value={formData.postal_code} onChange={handleInputChange} placeholder="Postal Code" required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
