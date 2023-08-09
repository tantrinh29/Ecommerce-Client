import Layout from "../admin/components/Layout";
import Categories from "../admin/pages/Categories";
import Products from "../admin/pages/Products";
import NotFound from "../components/404";
import { Route, Routes } from "react-router-dom";
import Home from "../admin/pages/Home";
import Orders from "../admin/pages/Orders";
function AdminApp() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
          {/* 
        <Route path="/list-order" element={<ListOrderAdmin />} />
        <Route path="/detail-order/:codeOrder" element={<DetailOrderAdmin />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export { AdminApp };
