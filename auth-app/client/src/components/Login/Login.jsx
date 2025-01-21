import './Login.css';
import { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };

    fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })

  };

  return (
    <div className="login-container">
      <h2>Sign in</h2>
      <form className="custom-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label className="custom-label">Username:</label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            className="custom-input"
            type="text"
            value={username}
          />
        </div>

        <div className="input-group">
          <label className="custom-label">Password:</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="custom-input"
            type="password"
            value={password}
          />
        </div>

        <button className="custom-button" type="submit">
          Login
        </button>

        <a href="/forgot-password" className="forgot-password">
          Forgot your password?
        </a>
      </form>
    </div>
  );
};

export default Login;
