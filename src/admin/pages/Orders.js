import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteOrderById, orderAllApi } from "../../api/orderApi";
import { formatPrice } from "../../utils/common";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await orderAllApi();
      setOrders(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="content-header">
        <ToastContainer />
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Order</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="#">Order</Link>
                </li>
                <li className="breadcrumb-item active">DS Order</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <section className="col-lg-12 connectedSortable">
            <div className="card-primary card-outline">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive p-0">
                    <table className="table table-bordered table-striped table-hover">
                      <thead>
                        <tr className="text-center">
                          <th>STT</th>
                          <th>MÃ ĐƠN HÀNG</th>
                          <th>PAYMENT METHOD</th>
                          <th>TỔNG TIỀN</th>
                          <th>THANH TOÁN</th>
                          <th>TRẠNG THÁI</th>
                          <th>THAO TÁC</th>
                          <th>NGÀY ĐẶT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 ? (
                          orders.map((huydev, index) => (
                            <tr key={index} className="text-center">
                              <td>{index + 1}</td>
                              <td>{huydev.codeOrders}</td>
                              <td>{huydev.paymentMethod}</td>
                              <td>{formatPrice(huydev.totalPrice)}</td>
                              <td
                                style={
                                  huydev.paymentMethod === "TIENMAT"
                                    ? { color: "red", fontWeight: "bold" }
                                    : { color: "green", fontWeight: "bold" }
                                }
                              >
                                {huydev.paymentMethod === "TIENMAT"
                                  ? "Đang Khởi Tạo"
                                  : "Đã Thanh Toán"}
                              </td>
                              <td>{huydev.status}</td>
                              <td>
                                {huydev.status === "Đang Xử Lý" ? (
                                  <Link
                                    to={""}
                                    className="btn btn-danger text-alight"
                                  >
                                    Giao Hàng
                                  </Link>
                                ) : (
                                  <Link
                                    to={""}
                                    className="btn btn-danger text-alight"
                                    disabled
                                  >
                                    Khách Hàng Đã Nhận
                                  </Link>
                                )}
                              </td>
                              <td>
                                {new Date(huydev.create_at).toLocaleString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colspan="8" class="text-center">
                            <span class="text-danger font-weight-bold">
                              Không Có Dữ Liệu ...
                            </span>
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card-footer clearfix">
                  VUI LÒNG THAO TÁC CẨN THẬN
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
