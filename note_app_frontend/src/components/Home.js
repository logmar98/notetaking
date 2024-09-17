import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div style={styles.navbar}>
        <h1 style={styles.navbarTitle}>Notes</h1>
      </div>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.welcomeTitle}>Welcome to Notes App</h1>
          <p style={styles.welcomeText}>Effortlessly manage and organize your notes.</p>
          <div style={styles.buttonContainer}>
            <button
              onClick={handleLogin}
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1A5276'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(41, 128, 185)'}
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1A5276'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(41, 128, 185)'}
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>© 2024 Notes App. All rights reserved.</p>
      </footer>
    </>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'rgb(44, 62, 80)', // Same as login and register
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navbarTitle: {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
  },
  hero: {
    height: '80vh',
    backgroundColor: '#f0f0f0', // Neutral light gray background similar to login/register
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333', // Font color to match the style of login/register
    textAlign: 'center',
    padding: '20px',
  },
  heroContent: {
    maxWidth: '600px',
    padding: '20px',
  },
  welcomeTitle: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333', // Consistent font color with login/register
  },
  welcomeText: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#666', // Softer color for the text
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '12px 25px',
    margin: '0 10px',
    backgroundColor: 'rgb(41, 128, 185)', // Button background color matching login/register
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centered button text
  },
  footer: {
    backgroundColor: 'rgb(44, 62, 80)', // Matching navbar/footer background with login/register
    color: 'white',
    padding: '10px 0',
    textAlign: 'center',
    fontSize: '14px',
    position: 'fixed',
    width: '100%',
    bottom: '0',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
