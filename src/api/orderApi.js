import axios from "axios";
import { https } from "../utils/http";

// Hàm gọi API
export const orderAPI = async (cartData, userId, totalAmount) => {
  try {
    const response = await axios.post(`${https}/orderOffice`, {
      cartData,
      userId,
      totalAmount,
    }); // Gửi yêu cầu POST
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderListAPI = async (id) => {
  try {
    const response = await axios.post(
      `${https}/listOrders`,
      { id }
    ); // Gửi yêu cầu GET
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderAllApi = async () => {
  try {
    const response = await axios.get(
      `${https}/listOrderAll`,
    ); // Gửi yêu cầu GET
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderCodeListAPI = async (code) => {
  try {
    const response = await axios.get(
      `${https}/listCodeOrders/${code}`
    ); // Gửi yêu cầu GET
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderById = async (id) => {
  try {
    const response = await axios.delete(`${https}/deleteOrderById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
