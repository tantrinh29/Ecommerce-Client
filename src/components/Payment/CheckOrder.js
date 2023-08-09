import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/common";
import { momoAPI } from "../../api/momoApi";
import { vnpayAPI } from "../../api/vnpayApi";
import { ToastContainer, toast } from "react-toastify";

export default function CheckOrder() {
  const huydev = useSelector((state) => state.cart.cart);
  const totalAmount = huydev.reduce(
    (total, item) => total + item.priceProduct * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentMethod = e.target.elements["payment-method"].value;

    if (huydev.length !== 0 && totalAmount > 0) {
      if (paymentMethod === "momo") {
        const huypayment = await momoAPI(totalAmount); // Gọi API momoAPI để lấy thông tin thanh toán online
        window.location.href = `${huypayment.payUrl}`;
      } else if (paymentMethod === "vnpayment") {
        const huypayment = await vnpayAPI(totalAmount);
        window.location.href = `${huypayment.vnpUrl}`;
      } else if (paymentMethod === "receive") {
        window.location.href = `https://react-tmdt-huyit.vercel.app/ttonline?paymentMethod=receive`;
      } else {
        toast.error("Vui lòng chọn phương thức thanh toán nhé !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
    } else {
      toast.error("Giỏ Hàng Rỗng , Vui Lòng Mua Hàng Để Thanh Toán Nhé !!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const cartItems = (product) => {
    return (
      <div className="widget px-lg-2" key={product.id}>
        <div className="d-flex align-items-center pb-2 border-bottom">
          <a
            className="d-block flex-shrink-0 me-2"
            href="marketplace-single.html"
          >
            <img
              className="rounded-1"
              src={product.imageProduct}
              width="64"
              alt="Product"
            />
          </a>
          <div className="ps-1">
            <h6 className="widget-product-title">{product.nameProduct}</h6>
            <div className="widget-product-meta">
              <span className="text-accent border-end pe-2 me-2">
                {formatPrice(product.quantity * product.priceProduct)}
              </span>
              <span className="fs-xs text-muted">{product.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="container text-center">
        <span className="text-danger font-weight-bold">
          Không Có Dữ Liệu ...
        </span>
      </div>
    );
  };
  return (
    <>
    <ToastContainer/>
      <div className="container mx-auto p-5">
        <div className="row mt-3">
          <div className="col-sm-12 col-lg-6">
            <h2 className="pb-3">Phương Thức Thanh Toán</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="momo"
                  id="momo"
                  name="payment-method"
                />
                <label className="form-check-label" htmlFor="momo">
                  Thanh Toán Qua Momo
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="vnpayment"
                  id="vnpayment"
                  name="payment-method"
                />
                <label className="form-check-label" htmlFor="vnpayment">
                  Thanh Toán Qua Vnpayment
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="receive"
                  id="receive"
                  name="payment-method"
                />
                <label className="form-check-label" htmlFor="receive">
                  Nhận Hàng Mới Thanh Toán
                </label>
              </div>

              <div className="mt-3">
                <button className="btn btn-success">Thanh Toán Thôi Nào</button>
              </div>
            </form>
          </div>
          <div className="col-lg-4 d-none d-lg-block ps-xl-5">
            <div className="widget px-lg-2 mb-3">
              <h2 className="widget-title text-center pb-3">
                Thông Tin ĐH
              </h2>
              {huydev.length === 0 && emptyCart()}
              {huydev.length !== 0 && huydev.map(cartItems)}
              <h4 className="fw-normal text-center my-4 text-danger">
                Tổng Tiền : {formatPrice(totalAmount)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
