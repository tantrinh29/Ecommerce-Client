import { useEffect, useState } from "react";
import { getProductByslug } from "../../api/productApi";
export default function useDetailProduct(slug) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await getProductByslug(slug);
        setProduct(result);
        setLoading(false);
      } catch (error) {
        console.log("All Product Ne", error);
      }
    })();
  }, []);
  return { product, loading };
}
