import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      if (product) {
        // Kiểm tra xem product đã tồn tại hay chưa
        const existingProductIndex = state.findIndex(
          (x) => x.id === product.id
        );
        const newQuantity = parseInt(quantity); // Chuyển đổi chuỗi ký tự sang số nguyên
        if (existingProductIndex !== -1) {
          // CẬP NHẬT SỐ LƯỢNG MỚI CHO SẢN PHẨM ĐÃ TỒN TẠI
          state[existingProductIndex].quantity += newQuantity;
        } else {
          // THÊM SẢN PHẨM MỚI
          product.quantity = newQuantity;
          state.push(product);
        }
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      return state.filter((x) => x.id !== product.id);
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((x) => x.id === product.id);
      if (existingProduct.quantity === 1) {
        // XÓA SẢN PHẨM
        return state.filter((x) => x.id !== product.id);
      } else {
        // GIẢM SỐ LƯỢNG
        existingProduct.quantity -= 1;
      }
    },
    increasingQuantity: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((x) => x.id === product.id);
      if (existingProduct) {
        // TĂNG SỐ LƯỢNG
        existingProduct.quantity += 1;
      } else {
        // THÊM SẢN PHẨM MỚI
        product.quantity = 1;
        state.push(product);
      }
    },
    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  increasingQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
