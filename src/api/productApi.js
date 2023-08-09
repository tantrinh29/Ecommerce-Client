import axios from "axios";
import { https } from "../utils/http";

export const addProductAPI = async (userData) => {
  try {
    const response = await axios.post(`${https}/addProduct`, userData); // Gửi yêu cầu POST
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listProductAPI = async () => {
  try {
    const response = await axios.get(`${https}/listProduct`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listProductPageAPI = async (currentPage, pageSize) => {
  try {
    const response = await axios.get(
      `${https}/listPageProduct?page=${currentPage}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axios.post(`${https}/getProductById`, { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateProductAPI = async (productId, updateData) => {
  try {
    const response = await axios.put(`${https}/updateProduct`, {
      productId,
      updateData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteProductById = async (id) => {
  try {
    const response = await axios.delete(`${https}/deleteProductById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByslug = async (slug) => {
  try {
    const response = await axios.get(`${https}/getProductBySlug/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductOfCategory = async (id) => {
  try {
    const response = await axios.get(`${https}/getProductOfCategory/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (searchValue) => {
  try {
    const response = await axios.get(`${https}/searchProducts`, {
      params: {
        searchValue,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
