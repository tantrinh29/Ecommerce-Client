import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/common";
import { ToastContainer, toast } from "react-toastify";
import { removeFromCart } from "../../redux/cartSlide/cartSlice";

function Footer() {
  const dispatch = useDispatch();
  const huydev = useSelector((state) => state.cart.cart);
  const totalAmount = huydev.reduce(
    (total, item) => total + item.priceProduct * item.quantity,
    0
  );

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

  const emptyCart = () => {
    return (
      <div className="container">
        <span className="text-danger font-weight-bold">
          Không Có Dữ Liệu ...
          </span>
      </div>
    );
  };
  return (
    <div className="footer-section">
      <ToastContainer />
      <footer className="section-footer bg-white border-top">
        <div className="container">
          <section className="footer-main padding-y">
            <div className="row">
              <aside className="col-12 col-sm-12 col-lg-3">
                <article className="me-lg-4">
                  <p className="mt-3">
                    © 2023- 2024 Lê Quốc Huy <br /> All rights reserved.
                  </p>
                </article>
              </aside>
              <aside className="col-6 col-sm-4 col-lg-2">
                <h6 className="title">Store</h6>
                <ul className="list-menu mb-4">
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Find store</a>
                  </li>
                  <li>
                    <a href="#">Categories</a>
                  </li>
                  <li>
                    <a href="#">Blogs</a>
                  </li>
                </ul>
              </aside>
              <aside className="col-6 col-sm-4 col-lg-2">
                <h6 className="title">Information</h6>
                <ul className="list-menu mb-4">
                  <li>
                    <a href="#">Help center</a>
                  </li>
                  <li>
                    <a href="#">Money refund</a>
                  </li>
                  <li>
                    <a href="#">Shipping info</a>
                  </li>
                  <li>
                    <a href="#">Refunds</a>
                  </li>
                </ul>
              </aside>
              <aside className="col-6 col-sm-4  col-lg-2">
                <h6 className="title">Support</h6>
                <ul className="list-menu mb-4">
                  <li>
                    <a href="#"> Help center </a>
                  </li>
                  <li>
                    <a href="#"> Documents </a>
                  </li>
                  <li>
                    <a href="#"> Account restore </a>
                  </li>
                  <li>
                    <a href="#"> My Orders </a>
                  </li>
                </ul>
              </aside>
              <aside className="col-12 col-sm-12 col-lg-3">
                <h6 className="title">Newsletter</h6>
                <p>
                  Stay in touch with latest updates about our products and
                  offers
                </p>
              </aside>
            </div>
          </section>

          <section className="footer-bottom d-flex justify-content-lg-between border-top">
            <div>
              <i className="fab fa-lg fa-cc-visa"></i>
              <i className="fab fa-lg fa-cc-amex"></i>
              <i className="fab fa-lg fa-cc-mastercard"></i>
              <i className="fab fa-lg fa-cc-paypal"></i>
            </div>
            <nav className="dropup">
              <button
                className="dropdown-toggle btn d-flex align-items-center py-0"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src="assets/images/flag-usa.webp"
                  className="me-2"
                  height="20"
                  alt="#"
                />
                <span>English</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Russian
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Arabic
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Spanish
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </footer>

      <aside className="offcanvas offcanvas-end" id="offcanvas_cart">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Your cart ({huydev.length}) </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        {huydev.length !== 0 ? (
          <div className="offcanvas-body">
            {huydev.length !== 0 &&
              huydev.map((product) => {
                return (
                  <figure className="itemside mb-4" key={product.id}>
                    <div className="aside">
                      <img
                        src={product.imageProduct}
                        className="border img-sm rounded"
                        alt={product.nameProduct}
                      />
                    </div>
                    <figcaption className="info">
                      <button
                        onClick={() => handleDel(product)}
                        className="btn btn-icon btn-light float-end"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      <p> {product.nameProduct}</p>
                      <span className="text-muted">
                        {product.quantity} x {formatPrice(product.priceProduct)}
                      </span>
                      <br />
                      <strong className="price">
                        {formatPrice(product.quantity * product.priceProduct)}
                      </strong>
                    </figcaption>
                  </figure>
                );
              })}
            <hr />

            <p className="mb-3 text-center">
              Subtotal:
              <strong className="text-danger">
                {formatPrice(totalAmount)}
              </strong>
            </p>
            <div className="mb-3">
              <Link to={"/billingInformation"} className="btn w-100 btn-success">
                Checkout
              </Link>
            </div>
            <p className="mb-3 text-center">
              <img src="assets/images/payments.webp" alt="#" height="22" />
            </p>
          </div>
        ) : (
          <div className="offcanvas-body text-center">
            {huydev.length === 0 && emptyCart()}
          </div>
        )}
      </aside>
    </div>
  );
}

export default Footer;
