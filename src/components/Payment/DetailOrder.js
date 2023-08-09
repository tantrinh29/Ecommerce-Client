import React from "react";
import { useParams } from "react-router-dom";
import useCodeOrders from "../Hook/useCodeOrders";
import { formatPrice } from "../../utils/common";
import Spinner from 'react-bootstrap/Spinner';

export default function DetailOrder() {
  const { code } = useParams();
  const { codes, loading } = useCodeOrders(code);
  let cartOrder = [];
  if (codes && codes.cartOrder) {
    cartOrder = JSON.parse(codes.cartOrder);
  }
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
  return (
    <div className="container py-5">
      <h2 className="text-center">
        Detail Order <b className="text-danger">{code}</b>
      </h2>
      <div className="col-md-12">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th>STT</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                {cartOrder.map((huyit, index) => (
                  <tr key={huyit.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        width={100}
                        src={huyit.imageProduct}
                        alt={huyit.nameProduct}
                      />
                    </td>
                    <td>{huyit.nameProduct}</td>
                    <td>{formatPrice(huyit.priceProduct)}</td>
                    <td>{huyit.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
