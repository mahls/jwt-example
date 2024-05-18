import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginPageProps {
  handleLogin: (username: string, password: string) => void;
}

interface HomePageProps {
  token: string;
  setToken: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => handleLogin(username, password)}>Login</button>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ token, setToken }) => {

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(''); // Clear token state
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome! You are logged in.</p>
      <p>Token: {token}</p>
      <Link to="/" onClick={handleLogout}>Logout</Link>
    </div>
  );
};

function App() {
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate(); // Create navigate function instance

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      setToken(token);
      navigate('/home'); // Use navigate function to change route
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data.error);
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  return (

      <div>
        <h1>JWT Demo</h1>
        <Routes>
          <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
          <Route
            path="/home"
            element={token ? <HomePage token={token} setToken={setToken} /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>

  );
}

export default App;