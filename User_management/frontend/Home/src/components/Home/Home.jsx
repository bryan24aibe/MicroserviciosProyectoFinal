import './Home.css';
import { useState, useEffect } from 'react';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const logout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setCurrentUser(null);
        localStorage.removeItem('user');
        // Redirigir a Google reemplazando el historial
        window.location.replace('https://www.google.com');
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <h1>PhonePlanet</h1>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-item">
            Home
          </a>
          <a href="/products" className="nav-item">
            Products
          </a>
          <a href="/cart" className="nav-item">
            Cart
          </a>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <header className="hero-section">
        <h1>Welcome to PhonePlanet</h1>
        <p>A complete world of phones and accessories</p>
      </header>
    </div>
  );
};

export default Home;
