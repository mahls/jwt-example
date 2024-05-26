import React from 'react';
import { Link } from 'react-router-dom';
import { HomeNav } from '../components/HomeNav';

interface HomePageProps {
  username: string;
  handleLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ username, handleLogout }) => {
  return (
    <div className='bg-[#141414] h-screen text-white'>
      <HomeNav username={username} />
      <p>Hello {username}!</p>
      <Link to="/" onClick={handleLogout}>Logout</Link>
    </div>
  );
};

export default HomePage;