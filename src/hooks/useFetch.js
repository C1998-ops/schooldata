import { useState, useEffect } from "react";
import axios from "axios";
export const useFetch = (url, delay = 300) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(url, {
          cancelToken: source.token,
          headers: { "Content-Type": "application/json" },
        });
        const { status, data } = result;
        if (status === 200) {
          setTimeout(() => {
            setData(data?.data);
          }, delay);
        } else {
          setLoading(false);
          throw new Error("Invalid data format");
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setLoading(false);
          setError(err.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      source.cancel();
    };
  }, [url, delay]);
  return { data, error, loading };
};
