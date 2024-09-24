// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [editName, setEditName] = useState('');
//   const [editPassword, setEditPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [profileImage, setProfileImage] = useState(null); // Hantera profilbild

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       try {
//         // Hämtar användarens profil
//         const { data: userData } = await axios.get('http://localhost:3000/api/users/profile', config);
//         setUser(userData);
//         setEditName(userData.name);

//         // Hämtar användarens bokningar
//         const { data: bookingsData } = await axios.get('http://localhost:3000/api/bookings', config);
//         setBookings(bookingsData);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleNameChange = async () => {
//     if (!editName) return;
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       const { data } = await axios.put('http://localhost:3000/api/users/profile', { name: editName }, config);
//       setUser({ ...user, name: data.name });
//       setMessage('Name updated successfully!');
//     } catch (err) {
//       console.error('Error updating name:', err);
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (editPassword !== confirmPassword) {
//       setMessage('Passwords do not match!');
//       return;
//     }
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       await axios.put('http://localhost:3000/api/users/password', { password: editPassword }, config);
//       setMessage('Password updated successfully!');
//       setEditPassword('');
//       setConfirmPassword('');
//     } catch (err) {
//       console.error('Error updating password:', err);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     const token = localStorage.getItem('token');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     };

//     try {
//       const { data } = await axios.put('http://localhost:3000/api/users/profile/image', formData, config);
//       setProfileImage(data.imageUrl);
//       setMessage('Profile image updated successfully!');
//     } catch (err) {
//       console.error('Error uploading image:', err);
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="profile-container">
//       <h1>Welcome, {user.name}</h1>
//       <p>Email: {user.email}</p>

//       <div className="profile-image">
//         <img src={profileImage || user.profileImage || 'default-image-url.png'} alt="Profile" />
//         <input type="file" onChange={handleImageUpload} />
//       </div>

//       <div className="profile-info">
//         <div className="profile-section">
//           <h2>Edit Name</h2>
//           <input
//             type="text"
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//           />
//           <button onClick={handleNameChange}>Save Name</button>
//         </div>

//         <div className="profile-section">
//           <h2>Change Password</h2>
//           <input
//             type="password"
//             placeholder="New Password"
//             value={editPassword}
//             onChange={(e) => setEditPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button onClick={handlePasswordChange}>Change Password</button>
//         </div>
//       </div>

//       <h2>Your Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>You have no bookings yet.</p>
//       ) : (
//         <ul className="bookings-list">
//           {bookings.map((booking) => (
//             <li key={booking._id}>
//               {booking.service} - {new Date(booking.date).toLocaleDateString()} - {booking.status}
//             </li>
//           ))}
//         </ul>
//       )}

//       {message && <p className="success-message">{message}</p>}
//     </div>
//   );
// };

// export default ProfilePage;



// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null); // Hantera profilbild

  // Bas-URL för API
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Hämtar användarens profil
        const { data: userData } = await axios.get(`${API_URL}/api/users/profile`, config);
        setUser(userData);
        setEditName(userData.name);

        // Hämtar användarens bokningar
        const { data: bookingsData } = await axios.get(`${API_URL}/api/bookings`, config);
        setBookings(bookingsData);
      } catch (err) {
        setMessage(`Error fetching data: ${err.response?.data?.message || err.message}`);
      }
    };

    fetchUserProfile();
  }, [API_URL]);

  const handleNameChange = async () => {
    if (!editName) return;
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(`${API_URL}/api/users/profile/name`, { name: editName }, config);
      setUser({ ...user, name: data.name });
      setMessage('Name updated successfully!');
    } catch (err) {
      setMessage(`Error updating name: ${err.response?.data?.message || err.message}`);
    }
  };

  const handlePasswordChange = async () => {
    if (editPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(`${API_URL}/api/users/profile/password`, { password: editPassword }, config);
      setMessage('Password updated successfully!');
      setEditPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(`Error updating password: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const { data } = await axios.put(`${API_URL}/api/users/profile/image`, formData, config);
      setProfileImage(data.imageUrl);
      setMessage('Profile image updated successfully!');
    } catch (err) {
      setMessage(`Error uploading image: ${err.response?.data?.message || err.message}`);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <div className="profile-image">
        <img src={profileImage || user.profileImage || 'default-image-url.png'} alt="Profile" />
        <input type="file" onChange={handleImageUpload} />
      </div>

      <div className="profile-info">
        <div className="profile-section">
          <h2>Edit Name</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={handleNameChange}>Save Name</button>
        </div>

        <div className="profile-section">
          <h2>Change Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Change Password</button>
        </div>
      </div>

      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.service} - {new Date(booking.date).toLocaleDateString()} - {booking.status}
            </li>
          ))}
        </ul>
      )}

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ProfilePage;
