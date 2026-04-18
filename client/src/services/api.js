import axios from "axios";

const API = "http://127.0.0.1:5000";

export const getCustomers = () => axios.get(`${API}/customers`);
export const getHealth = (id) => axios.get(`${API}/health/${id}`);
export const getChurn = (id) => axios.get(`${API}/churn/${id}`);
export const sendChat = (msg) =>
  axios.post(`${API}/chat`, { message: msg });