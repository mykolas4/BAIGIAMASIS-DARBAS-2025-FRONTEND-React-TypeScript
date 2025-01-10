import axios from "axios";

type userCredentials = {
  email: string;
  password: string;
};

export const loginUser = async (userData: userCredentials) => {
  const response = await axios.post(`http://localhost:3002/login`, userData);
  return response;
};

export const registerUser = async (userData: userCredentials) => {
  try {
      const response = await axios.post(`http://localhost:3002/register`, userData);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
      } else {
      }
      throw error; 
  }
};