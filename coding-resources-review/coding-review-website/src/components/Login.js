import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Login({ setToken }) { // Destructure setToken from props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Save the token for future requests
      setToken(data.token); // Update the token state in App.js
      navigate('/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Error logging in:', error);
      setError("Failed to Login User");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
} 

export default Login;