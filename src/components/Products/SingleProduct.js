import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/common";
import useDetailProduct from "../Hook/useDetailProducts";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { addToCart } from "../../redux/cartSlide/cartSlice";
import Spinner from "react-bootstrap/Spinner";

function SingleProduct() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1); // Giá trị mặc định là 1

  const increaseQuantity = () => {
    setQuantity(quantity + 1); // Tăng giá trị quantity lên 1
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Giảm giá trị quantity xuống 1, nhưng không thấp hơn 1
    }
  };

  const dispatch = useDispatch();
  // console.log(slug);
  const { product, loading } = useDetailProduct(slug);
  // add product
  const addProduct = (product) => {
    dispatch(addToCart({ product, quantity }));
    toast.success("Thêm Sản Phẩm Thành Công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // loadding
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
    <div className="home-section">
      <ToastContainer />
      <section className="bg-primary padding-y-sm">
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to={"#"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.nameProduct}
            </li>
          </ol>
        </div>
      </section>

      <section className="padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-lg-6">
              <article className="gallery-wrap">
                {product.imageProduct ? (
                  <img height="560" src={product.imageProduct} alt="" />
                ) : (
                  <Skeleton height={560} width={100} />
                )}
                {/* <div className="thumbs-wrap">
                  <a
                    data-fslightbox="mygalley"
                    data-type="image"
                    href="assets/images/items/10.webp"
                    className="item-thumb"
                  >
                    <img
                      width="60"
                      height="60"
                      src="assets/images/items/10.webp"
                    />
                  </a>
                  <a
                    data-fslightbox="mygalley"
                    data-type="image"
                    href="assets/images/items/10.webp"
                    className="item-thumb"
                  >
                    <img
                      width="60"
                      height="60"
                      src="assets/images/items/10.webp"
                    />
                  </a>
                  <a
                    data-fslightbox="mygalley"
                    data-type="image"
                    href="assets/images/items/10.webp"
                    className="item-thumb"
                  >
                    <img
                      width="60"
                      height="60"
                      src="assets/images/items/10.webp"
                    />
                  </a>
                  <a
                    data-fslightbox="mygalley"
                    data-type="image"
                    href="assets/images/items/10.webp"
                    className="item-thumb"
                  >
                    <img
                      width="60"
                      height="60"
                      src="assets/images/items/10.webp"
                    />
                  </a>
                  <a
                    data-fslightbox="mygalley"
                    data-type="image"
                    href="assets/images/items/10.webp"
                    className="item-thumb"
                  >
                    <img
                      width="60"
                      height="60"
                      src="assets/images/items/10.webp"
                    />
                  </a>
                </div> */}
              </article>
            </aside>
            <main className="col-lg-6">
              <article className="ps-lg-3">
                <h4 className="title text-dark">
                  {product.nameProduct || <Skeleton />}
                </h4>
                <div className="rating-wrap my-3">
                  <ul className="rating-stars">
                    <li style={{ width: "80%" }} className="stars-active">
                      <img src="assets/images/misc/stars-active.svg" alt="" />
                    </li>
                    <li>
                      <img src="assets/images/misc/starts-disable.svg" alt="" />
                    </li>
                  </ul>
                  <b className="label-rating text-warning"> 4.5</b>
                  <i className="dot"></i>
                  <span className="label-rating text-muted">
                    <i className="fa fa-shopping-basket"></i> 154 orders
                  </span>
                  <i className="dot"></i>
                  <span className="label-rating text-success">In stock</span>
                </div>

                <div className="mb-3">
                  <var className="price h5">
                    {formatPrice(product.priceProduct) || <Skeleton />}
                  </var>
                </div>

                <p>{product.introduceProduct || <Skeleton count={6} />}</p>

                <hr />

                <div className="row mb-4">
                  <div className="col-md-4 col-6 mb-3">
                    <label className="form-label d-block">Quantity</label>
                    <div className="input-group input-spinner">
                      <button
                        className="btn btn-icon btn-light"
                        type="button"
                        onClick={decreaseQuantity}
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
                        placeholder=""
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button
                        className="btn btn-icon btn-light"
                        type="button"
                        onClick={increaseQuantity}
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
                  </div>
                </div>

                <button className="btn  btn-warning">Buy now</button>
                <button
                  className="btn  btn-primary"
                  onClick={() => addProduct(product)}
                >
                  <i className="me-1 fa fa-shopping-basket"></i> Add to cart
                </button>
                <button className="btn  btn-light">
                  <i className="me-1 fa fa-heart"></i> Save
                </button>
              </article>
            </main>
          </div>
        </div>
      </section>

      <section className="padding-y bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <header className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <Link
                        href="#"
                        data-bs-target="#tab_specs"
                        data-bs-toggle="tab"
                        className="nav-link active"
                      >
                        Specification
                      </Link>
                    </li>
                  </ul>
                </header>
                <div className="tab-content">
                  <article
                    id="tab_specs"
                    className="tab-pane show active card-body"
                  >
                    {product.descProduct ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.descProduct,
                        }}
                      />
                    ) : (
                      <Skeleton count={6} />
                    )}
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;
