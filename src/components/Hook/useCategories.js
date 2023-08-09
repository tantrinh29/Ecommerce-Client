import { useEffect, useState } from "react";
import { listCategoryAPI } from "../../api/categoryApi";
export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await listCategoryAPI();
        setCategories(result);
        setLoading(false);
      } catch (error) {
        console.log("All Category Ne", error);
      }
    })();
  }, []);
  return { categories, loading };
}
