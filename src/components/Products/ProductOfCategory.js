import React from "react";
import useProductOfCategory from "../Hook/useProductOfCategory";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/common";
import Spinner from "react-bootstrap/Spinner";

export default function ProductOfCategory() {
  const { id } = useParams();
  const { productOfCategory, loading } = useProductOfCategory(id);
  if (loading) {
    <div className="loading-container">
      <div className="loading-overlay"></div>
      <div className="loading">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>;
  }

  const emptyCart = () => {
    return (
      <span className="text-danger font-weight-bold">Không Có Dữ Liệu ...</span>
    );
  };

  return (
    <section className="padding-y">
      <div className="container">
        <header className="section-heading">
          <h3 className="section-title">Categories</h3>
        </header>
        {productOfCategory.length !== 0 ? (
          <div className="row">
            {productOfCategory.map((product, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
                <figure className="card-product-grid">
                  <Link href="#" className="img-wrap rounded bg-gray-light">
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
        ) : (
          <div className="container text-center">
            {productOfCategory.length === 0 && emptyCart()}
          </div>
        )}
      </div>
    </section>
  );
}
