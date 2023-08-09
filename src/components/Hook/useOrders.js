import { useEffect, useState } from "react";
import { orderListAPI } from "../../api/orderApi";

export default function useOrders(id) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await orderListAPI(id);
        setOrders(result);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    })();
  }, [id]);

  return { orders, loading };
}




