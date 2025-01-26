import { useState } from 'react';
import './UpdateUser.css';

const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      new_username: newUsername,
      new_email: newEmail,
    };

    try {
      const response = await fetch('http://localhost:5000/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setUsername('');
        setNewUsername('');
        setNewEmail('');
      } else {
        setResponseMessage(data.error);
      }
    } catch (error) {
      setResponseMessage('An error occurred while connecting to the server.');
      console.error(error);
    }
  };

  return (
    <div className="update-container">
      <h1>Update User Information</h1>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Current Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter current username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new_username">New Username:</label>
          <input
            type="text"
            id="new_username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new_email">New Email:</label>
          <input
            type="email"
            id="new_email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            required
          />
        </div>
        <button type="submit" className="update-button">Update</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default UpdateUser;
