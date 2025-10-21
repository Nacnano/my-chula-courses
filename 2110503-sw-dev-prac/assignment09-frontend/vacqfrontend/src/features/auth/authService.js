import axios from "axios";

const API_URL = "http://localhost:5100/api/v1/auth/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register/", userData);
  if (response.data) {
    localStorage.setItem("user", response.data.name);
  }
  console.log(response.data);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", response.data.name);
  }
  console.log(response.data);
  return response.data;
};
// Logout user
const logout = () => {
  localStorage.setItem("user", null);
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
