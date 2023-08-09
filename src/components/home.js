import { Link } from "react-router-dom";
import { formatPrice } from "../utils/common";
import useProduct from "./Hook/useProduct";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const { products, loading } = useProduct();
  const [displayedProductCount, setDisplayedProductCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProductCount(displayedProductCount + 4);
      setIsLoading(false);
    }, 2000);
  };
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
      <section className="section-intro pt-3">
        <div className="container">
          <div className="row gx-3">
            <main className="col-lg-9">
              <article
                className="card-banner p-5 bg-primary"
                style={{ height: "350px" }}
              >
                <div style={{ maxWidth: "500px" }}>
                  <h2 className="text-white">
                    Great products with <br /> best deals
                  </h2>
                  <p className="text-white">
                    No matter how far along you are in your sophistication as an
                    amateur astronomer, there is always one.
                  </p>
                  <Link to={"/"} className="btn btn-warning">
                    View more
                  </Link>
                </div>
              </article>
            </main>
            <aside className="col-lg-3">
              <article
                className="card-banner h-100"
                style={{ backgroundColor: "var(--bs-warning)" }}
              >
                <div className="card-body text-center">
                  <h5 className="mt-3 text-white">Amazing Gifts</h5>
                  <p className="text-white">
                    No matter how far along you are in your sophistication
                  </p>
                  <Link to={"/"} className="btn btn-outline-light">
                    View more
                  </Link>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>


      <section className="padding-y">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">New products</h3>
          </header>
          <div className="row">
            {products.slice(0, displayedProductCount).map((product, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
                <figure className="card-product-grid">
                  <Link
                    to={`/detail-product/${product.slugProduct}`}
                    className="img-wrap rounded bg-gray-light"
                  >
                    <span className="topbar">
                      <span className="badge bg-danger"> New </span>
                    </span>
                    <img
                      height="250"
                      className="mix-blend-multiply"
                      src={product.imageProduct}
                      alt={product.nameProduct}
                    />
                  </Link>
                  <figcaption className="pt-2">
                    <Link href="#" className="float-end btn btn-light btn-icon">
                      <i className="fa fa-heart"></i>
                    </Link>
                    <strong className="price">
                      {formatPrice(product.priceProduct)}
                    </strong>
                    <Link
                      to={`/detail-product/${product.slugProduct}`}
                      className="title text-truncate"
                    >
                      {product.nameProduct}
                    </Link>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          {isLoading && (
            <Spinner animation="border" size="sm" variant="primary" />
          )}
        </div>
        <div className="text-center pt-5">
          {displayedProductCount < products.length && (
            <button className="btn btn-danger" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
export default Home;
