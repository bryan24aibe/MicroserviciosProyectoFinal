import './Login.css';
import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok && result.Status === 'Success') {
                alert('Login successful!');
                setUsername('');
                setPassword('');
            } else {
                alert(result.Error || 'Error logging in.');
                console.error('Error:', result);
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            alert('An error occurred during login.');
            console.error('Error:', error);
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
            </form>
        </div>
    );
};

export default Login;
