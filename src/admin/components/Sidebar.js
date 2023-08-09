import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link href="#" className="brand-link">
        <img
          src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Ecommerce</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="https://i.imgur.com/bbnrc1T.png"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link href="#" className="d-block">
              Admin
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item has-treeview">
              <Link to="/admin" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            {/* Products */}
            <li className="nav-item has-treeview">
              <Link className="nav-link">
                <i className="nav-icon fa-solid fa-user"></i>

                <p>
                  Products
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/admin/products" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>List</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Category */}
            <li className="nav-item has-treeview">
              <Link href="#" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>
                  Categories
                  <i className="fas fa-angle-left right"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/admin/categories" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>List</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Orders */}
            <li className="nav-item has-treeview">
              <Link to="/admin/orders" className="nav-link">
                <i className="nav-icon fas fa-shopping-cart"></i>
                <p>Orders</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
