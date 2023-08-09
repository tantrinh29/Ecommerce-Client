import { useEffect, useState } from "react";
import { listProductPageAPI } from "../../api/productApi";

export default function usePageProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const huydev = await listProductPageAPI(currentPage, pageSize);
        setProducts(huydev.products);
        setTotalPages(huydev.totalPages);
        setLoading(false);
        setTotalProducts(huydev.totalProducts);
      } catch (error) {
        console.log("All Products Ne", error);
      }
    })();
  }, [currentPage, pageSize]);

  return {
    products,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  };
}
