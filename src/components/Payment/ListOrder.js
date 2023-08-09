import React, { useEffect } from "react";
import useOrders from "../Hook/useOrders";
import { useSelector } from "react-redux";
import { formatDateTime, formatPrice } from "../../utils/common";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function ListOrder() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const { orders, loading } = useOrders(user?.id);
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-overlay"></div>
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    );
  }

  const emptyCart = () => {
    return (
      <tr className="text-center">
        <td colspan="8" class="actions">
          <span class="text-danger font-weight-bold">Không Có Dữ Liệu ...</span>
        </td>
      </tr>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center">List Orders</h2>
      <div className="col-md-12">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th>STT</th>
                  <th>MÃ ĐƠN HÀNG</th>
                  <th>PHƯƠNG THỨC TT</th>
                  <th>TỔNG TIỀN</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                  <th>NGÀY ĐẶT</th>
                </tr>
              </thead>
              {orders.length !== 0 ? (
                <tbody>
                  {orders.map((product, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{product.codeOrders}</td>
                      <td>{product.paymentMethod}</td>
                      <td>{formatPrice(product.totalPrice)}</td>
                      <td>{product.status}</td>

                      <td>
                        <Link
                          to={`/detailOrder/${product.codeOrders}`}
                          className="btn btn-primary"
                        >
                          Chi Tiết
                        </Link>
                      </td>
                      <td>{formatDateTime(product.create_at)}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>{orders.length === 0 && emptyCart()}</tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
