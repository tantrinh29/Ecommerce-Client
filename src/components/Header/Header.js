import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logouts } from "../../redux/authSlide/authSlide";
import useCategory from "../Hook/useCategories";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState(""); // Trạng thái lưu giá trị của ô tìm kiếm

  const user = useSelector((state) => state.auth.auth.user);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logouts());
    navigate("/login");
  };

  const { categories, loading } = useCategory();
  if (loading) {
    return <div>Loading ...</div>;
  }

  // search

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search-products/${searchValue}`);
  };

  return (
    <header className="section-header">
      <section className="header-main">
        <div className="container">
          <div className="row gy-3 align-items-center">
            <div className="col-lg-2 col-sm-4 col-4">
              <Link to={"/"} className="navbar-brand">
                Ecommerce
              </Link>
            </div>
            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="float-end">
                {user ? (
                  <Fragment>
                    <Link to={"/"} className="btn btn-light">
                      <i className="fa fa-user"></i>
                      <span className="ms-1 d-none d-sm-inline-block">
                        {user.username}
                      </span>
                    </Link>
                    <button className="btn btn-light" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      Logout
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link to={"/login"} className="btn btn-light">
                      <i className="fa fa-user"></i>
                      <span className="ms-1 d-none d-sm-inline-block">
                        Login
                      </span>
                    </Link>
                    <Link to={"/register"} className="btn btn-light">
                      <i className="fa fa-user"></i>
                      <span className="ms-1 d-none d-sm-inline-block">
                        Register
                      </span>
                    </Link>
                  </Fragment>
                )}

                <a
                  data-bs-toggle="offcanvas"
                  href="#offcanvas_cart"
                  className="btn btn-light"
                >
                  <i className="fa fa-shopping-cart"></i>
                  <span className="ms-1">My cart </span>
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <form action="#" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    required
                    type="search"
                    className="form-control"
                    style={{ width: "55%" }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search"
                  />

                  <button className="btn btn-primary">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <nav className="navbar navbar-light bg-gray-light navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler border"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar_main"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar_main">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="dropdown-toggle nav-link"
                  to={"/"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  {categories.map((huyit) => (
                    <li key={huyit.id}>
                      <Link
                        className="dropdown-item"
                        to={`/categories/${huyit.id}`}
                      >
                        {huyit.nameCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/shops"}>
                  Shops
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/carts"}>
                  Carts
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <Fragment>
                    <Link className="nav-link" to={"/listOrder"}>
                      List Orders
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
