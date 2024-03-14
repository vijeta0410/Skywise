import React, { useState } from 'react';

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const authToken = "fgi3j4593u3848344resd443"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        setMessage('Failed to sign in. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to sign in. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4"
      />
      <button type="submit" className="px-7 bg-[#49535C] rounded-lg flex flex-col w-28 items-center py-2 hover:scale-125 transition duration-150 ease-in-out">Sign in</button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default SignInForm;
