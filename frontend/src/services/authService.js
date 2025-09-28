import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

// Register new user
export const register = async (username, email, password, confirmPassword) => {
  const response = await axios.post(`${API_URL}register/`, {
    username,
    email,
    password,
    confirm_password: confirmPassword,
  });
  return response.data;
};

// Login user
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}login/`, {
    username,
    password,
  });

  if (response.data.access) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Get current user details
export const getUser = async () => {
  const token = JSON.parse(localStorage.getItem("user"))?.access;
  if (!token) return null;

  const response = await axios.get(`${API_URL}me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
};
