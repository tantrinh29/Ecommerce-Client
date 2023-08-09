import axios from "axios";
import { https } from "../utils/http";

// Hàm gọi API
export const addCategoryAPI = async (userData) => {
  try {
    const response = await axios.post(`${https}/addCategory`, userData); // Gửi yêu cầu POST
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const listCategoryAPI = async () => {
  try {
    const response = await axios.get(`${https}/listCategory`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.post(`${https}/getCategoryById`, { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCategoryAPI = async (cateId, updateData) => {
  try {
    const response = await axios.put(`${https}/updateCategory`, {
      cateId,
      updateData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteCategoryById = async (id) => {
  try {
    const response = await axios.delete(`${https}/deleteCategoryById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
