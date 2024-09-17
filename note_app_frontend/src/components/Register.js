import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:5000/register', {
        username,
        password,
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.navbar}>
        <h1 style={styles.navbarTitle}>Notes</h1>
      </div>
      <div style={styles.container}>
        <div style={styles.registerCard}>
          <h2 style={styles.title}>Create an Account</h2>
          <form style={styles.registerForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ ...styles.input, ...(username ? styles.inputFocus : {}) }}
              aria-label="Username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, ...(password ? styles.inputFocus : {}) }}
              aria-label="Password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ ...styles.input, ...(confirmPassword ? styles.inputFocus : {}) }}
              aria-label="Confirm Password"
            />
            <button
              type="submit"
              style={{ ...styles.button, backgroundColor: isHovered ? '#1A5276' : '#2980B9' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.loginLink}>
            Already have an account? <a href="/login" style={styles.link}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    backgroundColor: '#2C3E50',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navbarTitle: {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
  },
  registerCard: {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '28px',
    fontFamily: 'Arial, sans-serif',
    color: '#34495E',
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #BDC3C7',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#3498DB',
  },
  button: {
    padding: '12px',
    margin: '20px 0',
    backgroundColor: '#2980B9',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#1A5276',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
  loginLink: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#7F8C8D',
  },
  link: {
    color: '#2980B9',
    textDecoration: 'none',
  },
};

export default Register;
