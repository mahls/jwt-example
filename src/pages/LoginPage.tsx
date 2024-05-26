import React, { useState } from 'react';
import { register } from '../services/AuthServices';

interface LoginPageProps {
  handleLogin: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  username: string;
  password: string;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  setIsLoginOpen: (value: boolean) => void;
  setIsRegisterOpen: (value: boolean) => void;
}

{/* Register Modal */}
const RegisterModal = ({ register, username, password, setIsRegisterOpen}: LoginPageProps) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <div>
      <h1>Register</h1>
      <div className='fixed top-0 right-0 rounded shadow-lg h-screen w-full bg-stone-900 opacity-95 ' onClick={() => setIsRegisterOpen(false)}></div>
      
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 bg-white rounded shadow-lg'>
      <input className='bg-stone-200 text-xl p-2 rounded m-5' type="text" placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
      <input className='bg-stone-200 text-xl p-2 rounded m-5' type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      <button className='bg-stone-900 text-white text-xl p-2 rounded m-5' onClick={() => register(newUsername, newPassword)}>Register</button>

    </div>


    </div>
  )
}

{/* Login Modal */}
const LoginModal = ({ username, password, handleLogin, setUsername, setPassword, isLoginOpen, isRegisterOpen, setIsLoginOpen, setIsRegisterOpen }: LoginPageProps & { setUsername: (value: string) => void, setPassword: (value: string) => void }) => {
  return (
    <>
    <div className='fixed top-0 right-0 rounded shadow-lg h-screen w-full bg-stone-900 opacity-95' onClick={() => setIsLoginOpen(false)}></div>
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 bg-white rounded shadow-lg'>
      <input className='bg-stone-200 text-xl p-2 rounded m-5' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className='bg-stone-200 text-xl  p-2 rounded m-5' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className='bg-stone-900 text-white text-xl p-2 rounded m-5' onClick={() => handleLogin(username, password)}>Login</button>
    </div>
    </>
  )
}

const LoginRegisterButtons = ({ setIsRegisterOpen, setIsLoginOpen, isLoginOpen, isRegisterOpen }: { setIsRegisterOpen: (value: boolean) => void, setIsLoginOpen: (value: boolean) => void }) => {

  const buttonStyle = 'bg-[#1f1f1f] text-white text-2xl font-bold p-5 rounded m-5 bg-stone-900'

  return (
    <div className='grid grid-cols-1 jsustify-center items-center h-fulls'>
      <button className={buttonStyle} onClick={() => setIsLoginOpen(!isLoginOpen)}>Login</button>
      <button className={buttonStyle} onClick={() => setIsRegisterOpen(!isRegisterOpen)}>Register</button>
    </div>
  )
}

{/* Login Page */}
const LoginPage: React.FC<LoginPageProps> = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className='bg-[#1f1f1f] h-screen'>
      <h2 className='text-white text-xl sm:text-3xl font-bold p-5 mb-20'>mespace</h2>
      <LoginRegisterButtons setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} />
      {isLoginOpen && <LoginModal handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} setIsLoginOpen={setIsLoginOpen} />}
      {isRegisterOpen && <RegisterModal register={register} username={username} setUsername={setUsername} password={password} setPassword={setPassword} isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen} />}
    </div>
  );
};

export default LoginPage;
