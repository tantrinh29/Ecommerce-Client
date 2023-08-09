import axios from "axios";
import { https } from "../utils/http";

// Hàm gọi API
export const vnpayAPI = async (amout) => {
  try {
    const response = await axios.post(`${https}/apiVnpay`, { amout }); // Gửi yêu cầu POST
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const successVnpayAPI = async (
  paymentResponse,
  cartData,
  userId,
  totalAmount
) => {
  try {
    const response = await axios.post(`${https}/apiSuccessVnpay`, {
      paymentResponse,
      cartData,
      userId,
      totalAmount,
    }); // Gửi yêu cầu POST
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
