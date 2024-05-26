import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { login, decodeToken } from './services/AuthServices';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = decodeToken(storedToken);
      setUsername(decoded.userName);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const { token } = await login(username, password);
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = decodeToken(token);
      setUsername(decoded.userName);
      navigate('/home');
    } catch (error) {
      console.error("Login failed:", error);
      navigate('/');
      alert('invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUsername('');
    navigate('/');
  };

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/home" element={token ? <HomePage username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;