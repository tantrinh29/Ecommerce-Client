import { useEffect, useState } from "react";
import { orderCodeListAPI } from "../../api/orderApi";

export default function useCodeOrders(code) {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await orderCodeListAPI(code);
        setCodes(result);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    })();
  }, [code]);

  return { codes, loading };
}




