import './Singup.css';
import { useState } from 'react';

const Singup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('User registered successfully!');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                alert('Error registering user: ' + result.Error);
                console.error('Error:', result);
            }
        } catch (error) {
            alert('An error occurred while registering.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Sign up</h2>
            <form className="custom-form" onSubmit={handleRegister}>
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
                    <label className="custom-label">Email:</label>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        className="custom-input"
                        type="email"
                        value={email}
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
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Singup;
