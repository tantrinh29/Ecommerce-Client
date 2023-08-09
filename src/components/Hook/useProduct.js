import { useEffect, useState } from "react";
import { listProductAPI } from "../../api/productApi";
export default function useProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await listProductAPI();
        setProducts(result);
        setLoading(false);
      } catch (error) {
        console.log("All Products Ne", error);
      }
    })();
  }, []);
  return { products, loading };
}
