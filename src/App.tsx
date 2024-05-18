import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library for decoding JWT tokens

interface LoginPageProps {
  handleLogin: (username: string, password: string) => void;
}

interface HomePageProps {
  username: string;
  handleLogout: () => void;
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

const HomePage: React.FC<HomePageProps> = ({ username, handleLogout }) => {
  return (
    <div>
      <h2>Home</h2>
      <p>Hello {username}!</p>
      <Link to="/" onClick={handleLogout}>Logout</Link>
    </div>
  );
};

function App() {
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate(); // Create navigate function instance

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken)
      const decoded = jwtDecode(storedToken); // Adjust the type here based on actual token structure
      setUsername(decoded); // Adjust the property access here
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
  
      const decoded = jwtDecode(token);
      setUsername(decoded.userName);
      navigate('/home');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(''); // Clear token state
    setUsername(''); // Clear username state
  };

  return (
    <div>
      <h1>JWT Demo</h1>
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route
          path="/home"
          element={token ? <HomePage username={username} handleLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
