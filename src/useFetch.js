import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      const fetchdata = async () => {
        try {
          const response = await fetch(url, { signal: abortCont.signal });
          if (!response.ok) {
            throw error("could not fetch the data from the resource");
          }
          const result = await response.json();
          setData(result);
          setIsPending(false);
          setError(null);
        } catch (err) {
          if (err.name === "Abort Error") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        }
      };
      fetchdata();
    }, 1000);

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
