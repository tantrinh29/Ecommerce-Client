import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/common";
import {
  removeFromCart,
  increasingQuantity,
} from "../../redux/cartSlide/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity } from "../../redux/cartSlide/cartSlice";

const Carts = () => {
  const huydev = useSelector((state) => state.cart.cart);
  // console.log(huydev);
  // Tính Tổng Tiền
  const totalAmount = huydev.reduce(
    (total, item) => total + item.priceProduct * item.quantity,
    0
  );
  // console.log(totalAmount);
  // Action
  const dispatch = useDispatch();
  const handleAdd = (item) => {
    dispatch(increasingQuantity(item));
    toast.success("Đã Tăng Số Lượng Sản Phẩm", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // xóa 1 sản phẩm
  const handleReduce = (item) => {
    dispatch(decreaseQuantity(item));
    toast.error("Đã Giảm Số Lượng Sản Phẩm", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // xóa sản phẩm
  const handleDel = (item) => {
    dispatch(removeFromCart(item));
    toast.error("Xóa Sản Phẩm", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // paymentMethod
  const handelCheckOut = async () => {
    window.location.href = "/billingInformation";
  };

  const emptyCart = () => {
    return (
      <tr className="text-center">
        <td colSpan="8" className="actions">
          <span className="text-danger font-weight-bold">
          Không Có Dữ Liệu ...
          </span>
        </td>
      </tr>
    );
  };
  return (
    <>
      <ToastContainer />
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <table className="table table-bordered">
                <thead>
                  <tr className="small text-uppercase text-center">
                    <th scope="col">Product</th>

                    <th scope="col" width="200">
                      Quantity
                    </th>
                    <th scope="col" width="200">
                      Price
                    </th>
                    <th scope="col" width="200">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                {huydev.length !== 0 ? (
                  <tbody>
                    {huydev.length !== 0 &&
                      huydev.map((product) => {
                        return (
                          <tr key={product.id} className="text-center">
                            <td>
                              <figure className="itemside">
                                <div className="aside">
                                  <img
                                    src={product.imageProduct}
                                    className="img-sm"
                                    alt={product.nameProduct}
                                  />
                                </div>
                                <figcaption className="info">
                                  <Link className="title text-dark">
                                    {product.nameProduct}
                                  </Link>
                                </figcaption>
                              </figure>
                            </td>
                            <td>
                              <div className="input-group">
                                <button
                                  className="btn btn-icon btn-light"
                                  type="button"
                                  onClick={() => handleReduce(product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    fill="#999"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19 13H5v-2h14v2z"></path>
                                  </svg>
                                </button>
                                <input
                                  className="form-control text-center"
                                  value={product.quantity} // Đặt giá trị của product.quantity vào thuộc tính value
                                  readOnly // Sử dụng readOnly để không cho phép người dùng nhập giá trị trực tiếp
                                />
                                <button
                                  className="btn btn-icon btn-light"
                                  type="button"
                                  onClick={() => handleAdd(product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    fill="#999"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                </button>
                              </div>
                            </td>

                            <td>
                              <div className="price-wrap">
                                <var className="price">
                                  {formatPrice(
                                    product.quantity * product.priceProduct
                                  )}
                                </var>
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-light"
                                onClick={() => handleDel(product)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                ) : (
                  <tbody>{huydev.length === 0 && emptyCart()}</tbody>
                )}
              </table>

              <div className="card-body">
                <button
                  className="btn btn-primary"
                  onClick={handelCheckOut}
                  style={{ float: "right" }}
                >
                  Make Purchase <i className="fa fa-chevron-right"></i>
                </button>
                <button to={"#"} className="btn btn-light">
                  <i className="fa fa-chevron-left"></i> Continue shopping
                </button>
              </div>
              <div className="alert alert-success mt-3">
                <span className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Free
                  Delivery within 1-2 weeks
                </span>
              </div>
            </main>

            <aside className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Have coupon?</label>
                      <div className="input-group pt-2">
                        <input
                          type="text"
                          className="form-control"
                          name=""
                          placeholder="Coupon code"
                        />
                        <span className="input-group-append">
                          <button className="btn btn-primary">Apply</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total :</dt>
                    <dd className="text-right  h5">
                      <strong>{formatPrice(totalAmount)}</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="assets/images/payments.webp" height="26" alt="" />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carts;
