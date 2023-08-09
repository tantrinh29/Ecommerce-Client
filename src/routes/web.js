// import webapp
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Carts from "../components/Carts/Carts";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Shop from "../components/Products/Shops";
import SingleProduct from "../components/Products/SingleProduct";
import Home from "../components/home";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/404";
import ListOrder from "../components/Payment/ListOrder";
import DetailOrder from "../components/Payment/DetailOrder";
import CheckOrder from "../components/Payment/CheckOrder";
import TTOnline from "../components/Payment/TTOnline";
import BillingInformation from "../components/Payment/BillingInformation";
import ProductOfCategory from "../components/Products/ProductOfCategory";
import SearchProducts from "../components/Products/SearchProducts";

function WebApp() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail-product/:slug" exact element={<SingleProduct />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/payment" element={<CheckOrder />} />
        <Route path="/ttonline" element={<TTOnline />} />
        <Route path="/billingInformation" element={<BillingInformation />} />

        <Route
          path="/search-products/:searchValue"
          exact
          element={<SearchProducts />}
        />

        <Route path="/listOrder" element={<ListOrder />} />
        <Route path="/detailOrder/:code" element={<DetailOrder />} />
        <Route path="/categories/:id" element={<ProductOfCategory />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export { WebApp };
