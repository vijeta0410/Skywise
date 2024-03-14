import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false)
  const authToken = "fgi3j4593u3848344resd443";

  const handleLogin = async () => {
    try {
      const response = await fetch(`/api/users/details/${username}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },  
      });
      if (response.ok) {
        const userInfo = await response.json();
        
        if (userInfo && JSON.parse(userInfo).password === password) {
          return <Navigate to="/homepage" />;
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Failed to fetch user information');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      const response = await fetch('/api/user/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username, password, email}),
      });

      if (response.ok) {
        // User added successfully, proceed to login
        handleLogin();
      } else {
        setError('Failed to add user');
      }
    } catch (error) {
      setError('An error occurred while signing up');
    }
  };

  return (
    <div>
      <h2>{isSigningUp ? 'Signup' : 'Login'}</h2>
      {error && <p>{error}</p>}
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Email
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      {isSigningUp && (
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
      )}
      <button onClick={isSigningUp ? handleSignup : handleLogin}>{isSigningUp ? 'Signup' : 'Login'}</button>
      <button onClick={() => setIsSigningUp(!isSigningUp)}>{isSigningUp ? 'Switch to Login' : 'Switch to Signup'}</button>
    </div>
  );
};

export default Login;
