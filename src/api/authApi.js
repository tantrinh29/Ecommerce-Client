import axios from "axios";
import { https } from "../utils/http";

export const registerAPI = async (userData) => {
  try {
    const response = await axios.post(`${https}/register`, userData); // Gửi yêu cầu POST
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const loginAPI = async (userData) => {
  try {
    const response = await axios.post(`${https}/login`, userData); // Gửi yêu cầu POST
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserApi = async (userData) => {
  try {
    const response = await axios.put(`${https}/updateUser`, userData); // Gửi yêu cầu POST
    return response.data;
  } catch (error) {
    throw error;
  }
};
