import { Link } from "react-router-dom";
import useCategory from "../Hook/useCategories";
import { formatPrice } from "../../utils/common";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlide/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import usePageProduct from "../Hook/usePageShop";
import Spinner from "react-bootstrap/Spinner";

function Shop() {
  const { categories, loading: categoryLoading } = useCategory();
  const {
    products,
    loading: productLoading,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePageProduct();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1); // Giá trị mặc định là 0
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState(0); // Giá trị giá thấp nhất
  const [maxPrice, setMaxPrice] = useState(100000000); // Giá trị giá cao nhất
  const [cat, setCat] = useState("all");

  useEffect(() => {
    // Cập nhật lại giá trị của data khi có thay đổi trong products
    setData(products);
  }, [products]);

  // sort price filter
  const handleChange = (sortType) => {
    let sortProducts = [...data];
    if (sortType === "default") {
      setData(products);
      // console.log("default: ", products); // Log dữ liệu gốc
    }
    if (sortType === "priceHighToLow") {
      setData(
        sortProducts.sort((a, b) => {
          return b.priceProduct - a.priceProduct;
        })
      );
      // console.log("priceHighToLow: ", sortProducts); // Log dữ liệu sau khi sắp xếp giá cao đến thấp
    }
    if (sortType === "priceLowToHigh") {
      setData(
        sortProducts.sort((a, b) => {
          return a.priceProduct - b.priceProduct;
        })
      );
      // console.log("priceLowToHigh: ", sortProducts); // Log dữ liệu sau khi sắp xếp giá thấp đến cao
    }
  };

  // lọc theo price range

  const handlePriceFilter = () => {
    // Thực hiện lọc sản phẩm dựa trên giá trị min và max đã chọn
    const filteredProducts = data.filter(
      (product) =>
        product.priceProduct >= minPrice && product.priceProduct <= maxPrice
    );
    setFilter(filteredProducts);
  };

  useEffect(() => {
    // update lại giá trị của filter dựa trên cat và data
    let updatedFilter = [...data];
    // console.log("Đã Thay Đổi : ", updatedFilter);
    setFilter(updatedFilter);
  }, [cat, data]);

  // lọc
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.nameCategory === cat);
    setFilter(updatedList);
  };

  // add to  cart

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity }));
    // console.log("add to cart : ", product);
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

  // console.log(totalPages);

  if (categoryLoading || productLoading) {
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
      <span className="text-danger font-weight-bold">Không Có Dữ Liệu ...</span>
    );
  };

  return (
    <div className="home-section">
      <ToastContainer />
      <section className="bg-primary py-5">
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="#">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </div>
      </section>

      <section className="padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-lg-3">
              <button
                className="btn btn-outline-secondary mb-3 w-100  d-lg-none"
                data-bs-toggle="collapse"
                data-bs-target="#aside_filter"
              >
                Show filter
              </button>

              <div id="aside_filter" className="collapse card d-lg-block mb-5">
                <article className="filter-group">
                  <header className="card-header">
                    <Link
                      className="title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside1"
                    >
                      <i className="icon-control fa fa-chevron-down"></i>
                      Related items
                    </Link>
                  </header>
                  <div className="collapse show" id="collapse_aside1">
                    <div className="card-body">
                      <ul className="list-menu">
                        {categories.map((huyit) => (
                          <li key={huyit.id}>
                            <Link
                              onClick={() => filterProduct(huyit.nameCategory)}
                            >
                              {huyit.nameCategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <Link
                      className="title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside2"
                    >
                      <i className="icon-control fa fa-chevron-down"></i> Price
                    </Link>
                  </header>
                  <div className="collapse show" id="collapse_aside2">
                    <div className="card-body">
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="100000000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))} // Cập nhật giá trị minPrice trong state
                      />
                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="min" className="form-label">
                            Min
                          </label>
                          <input
                            className="form-control"
                            id="min"
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) =>
                              setMinPrice(Number(e.target.value))
                            }
                            type="number"
                          />
                        </div>

                        <div className="col-6">
                          <label htmlFor="max" className="form-label">
                            Max
                          </label>
                          <input
                            className="form-control"
                            id="max"
                            placeholder="100000000"
                            type="number"
                            value={maxPrice}
                            onChange={(e) =>
                              setMaxPrice(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handlePriceFilter()}
                        className="btn btn-light w-100"
                        type="button"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-lg-9">
              <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">
                  {filter.length} Items found
                </strong>
                <div className="ms-auto ">
                  <select
                    className="form-select d-inline-block w-auto me-1"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="priceHighToLow">Giá Từ Cao Đến Thấp</option>
                    <option value="priceLowToHigh">Giá Từ Thấp Đến Cao</option>
                  </select>
                  <div className="btn-group">
                    <Link
                      className="btn btn-light"
                      data-bs-toggle="tooltip"
                      title="List view"
                    >
                      <i className="fa fa-bars"></i>
                    </Link>
                    <Link
                      className="btn btn-light active"
                      data-bs-toggle="tooltip"
                      title="Grid view"
                    >
                      <i className="fa fa-th"></i>
                    </Link>
                  </div>
                </div>
              </header>

              {filter.length !== 0 ? (
                <div className="row">
                  {filter.length > 0 &&
                    filter.map((product, huyne) => (
                      <div className="col-lg-4 col-md-6 col-sm-6" key={huyne}>
                        <figure className="card card-product-grid">
                          <div className="img-wrap">
                            <img
                              src={product.imageProduct}
                              alt={product.nameProduct}
                            />
                          </div>
                          <figcaption className="info-wrap border-top">
                            <div className="price-wrap">
                              <strong className="price">
                                {formatPrice(product.priceProduct)}
                              </strong>
                            </div>
                            <p className="title mb-2">{product.nameProduct}</p>

                            <Link
                              href="#"
                              onClick={() => handleAddToCart(product)}
                              className="btn btn-primary"
                            >
                              Add to cart
                            </Link>
                            <Link href="#" className="btn btn-light btn-icon">
                              <i className="fa fa-heart"></i>
                            </Link>
                          </figcaption>
                        </figure>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center">
                  {filter.length === 0 && emptyCart()}
                </div>
              )}

              <hr />

              <footer className="d-flex mt-4">
                <nav className="ms-3">
                  <ul className="pagination">
                    {/* Hiển thị nút "Trang trước" nếu không phải trang đầu tiên */}
                    {currentPage > 1 && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to="#"
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </Link>
                      </li>
                    )}

                    {/* Hiển thị danh sách số trang */}
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        className={`page-item ${
                          index + 1 === currentPage ? "active" : ""
                        }`}
                        key={index}
                      >
                        <Link
                          className="page-link"
                          to="#"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}

                    {/* Hiển thị nút "Trang sau" nếu không phải trang cuối cùng */}
                    {currentPage < totalPages && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to="#"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </footer>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Shop;
