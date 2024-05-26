import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

export const login = async (username: string, password: string) => {
  const response = await axios.post('http://localhost:5000/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/register', { username, password });
        console.log('Registration successful', response.data);
        if(response.data){
            toast.success('Registration successful');
        }
        return response.data;
    } catch (error) {
        console.error('Registration failed', error.response.data);
        if (error.response && error.response.data === 'User already exists') {
            toast.error('User already exists');
        } else {
            toast.error('Registration failed');
        }
        // Handle other errors here, such as displaying a message to the user
    }
}

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};