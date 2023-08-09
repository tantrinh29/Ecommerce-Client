import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { successMomoAPI } from "../../api/momoApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { successVnpayAPI } from "../../api/vnpayApi";
import { orderAPI } from "../../api/orderApi";

export default function TTOnline() {
  const location = useLocation();
  // user
  const user = useSelector((state) => state.auth.auth.user);
  // cart
  const huydev = useSelector((state) => state.cart.cart);
  const totalAmount = huydev.reduce(
    (total, item) => total + item.priceProduct * item.quantity,
    0
  );

  const queryParams = new URLSearchParams(location.search);
  const paymentHuyNe = queryParams.get("paymentMethod");
  const [paymentMomo, setPaymentMomo] = useState({
    partnerCode: queryParams.get("partnerCode"),
    orderId: queryParams.get("orderId"),
    requestId: queryParams.get("requestId"),
    amount: queryParams.get("amount"),
    orderInfo: queryParams.get("orderInfo"),
    orderType: queryParams.get("orderType"),
    transId: queryParams.get("transId"),
    message: queryParams.get("message"),
  });
  const [paymentVnpay, setPaymentVnpay] = useState({
    vnp_Amount: queryParams.get("vnp_Amount"),
    vnp_BankCode: queryParams.get("vnp_BankCode"),
    vnp_BankTranNo: queryParams.get("vnp_BankTranNo"),
    vnp_CardType: queryParams.get("vnp_CardType"),
    vnp_OrderInfo: queryParams.get("vnp_OrderInfo"),
    vnp_TransactionNo: queryParams.get("vnp_TransactionNo"),
    vnp_TransactionStatus: queryParams.get("vnp_TransactionStatus"),
  });

  useEffect(() => {
    const handlePaymentResponse = async () => {
      // Dữ liệu giỏ hàng của người dùng
      const cartData = huydev;
      // Thực hiện gọi API successMomoAPI hoặc successVnpayAPI tùy vào paymentHuyNe
      try {
        let response;
        if (paymentHuyNe === "momo") {
          response = await successMomoAPI(
            paymentMomo,
            cartData,
            user.id,
            totalAmount
          );
        } else if (paymentHuyNe === "vnpay") {
          response = await successVnpayAPI(
            paymentVnpay,
            cartData,
            user.id,
            totalAmount
          );
        } else if (paymentHuyNe === "receive") {
          response = await orderAPI(cartData, user.id, totalAmount);
        } else {
          console.log("Huy Nè!");
        }
        if (response.status === true) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(function() {
            window.location.href = "/listOrder";
          }, 2000);     
        }
      } catch (error) {
        console.log(error);
      }
    };
    handlePaymentResponse();
  }, []);

  return (
    <div className="text-center p-5">
      <ToastContainer />
      <h1>Đơn hàng đang xử lý...</h1>
    </div>
  );
}
