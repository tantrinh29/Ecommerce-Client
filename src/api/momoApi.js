import axios from "axios";
import { https } from "../utils/http";

// Hàm gọi API
export const momoAPI = async (amout) => {
  try {
    const response = await axios.post(`${https}/apiMomo`, { amout }); // Gửi yêu cầu POST
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const successMomoAPI = async (
  paymentResponse,
  cartData,
  userId,
  totalAmount
) => {
  try {
    const response = await axios.post(`${https}/apiSuccessMomo`, {
      paymentResponse,
      cartData,
      userId,
      totalAmount,
    }); // Gửi yêu cầu POST
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
