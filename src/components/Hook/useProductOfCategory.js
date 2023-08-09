import { useEffect, useState } from "react";
import { getProductOfCategory } from "../../api/productApi";
export default function useProductOfCategory(id) {
  const [productOfCategory, setProductOfCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await getProductOfCategory(id);
        setProductOfCategory(result);
        setLoading(false);
      } catch (error) {
        console.log("All Product Ne", error);
      }
    })();
  }, [id]);
  return { productOfCategory, loading };
}
