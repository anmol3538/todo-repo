import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// LOGIN
export const loginUser = async (credentials) => {
  const res = await axiosInstance.post(`${API_BASE_URL}/user/login`, credentials);
  return res.data;
};

// SIGNUP
export const signupUser = async (userData) => {
  const res = await axiosInstance.post(`${API_BASE_URL}/user/register`, userData);
  console.log(res.data);
  return res.data;
};

// ADD TASK
export const addTask = async (taskData) => {
  console.log(taskData);
  const res = await axiosInstance.post(`${API_BASE_URL}/list/additems`, taskData);
  console.log(res);
  return res.data;
};

// GET TASKS
export const getTasks = async (token) => {
    const res = await axiosInstance.get(`${API_BASE_URL}/list/getlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
};  
// DELETE TASK
export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(`${API_BASE_URL}/list/deletelist/${id}`);
  return res.data;
};

// UPDATE TASK
export const updateTask = async (taskId, updatedTaskData) => {
    const res = await axiosInstance.put(`${API_BASE_URL}/list/updatelist/${taskId}`,  updatedTaskData );
    return res.data;
  };
  