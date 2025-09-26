import axios from "axios";
const API_URL = "http://localhost:5000";

export const fetchMessages = async (roomId) => {
  const res = await axios.get(`${API_URL}/messages?roomId=${roomId}`);
  return res.data;
};

export const sendMessage = async (roomId, senderId, content) => {
  const res = await axios.post(`${API_URL}/messages`, { roomId, senderId, content });
  return res.data;
};

export const fetchTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(`${API_URL}/tasks`, task);
  return res.data;
};

export const fetchDocs = async () => {
  const res = await axios.get(`${API_URL}/documents`);
  return res.data;
};
