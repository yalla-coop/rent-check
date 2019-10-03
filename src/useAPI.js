import { useState, useCallback } from 'react';
import axios from 'axios';

// const useAPI = fn => {
//   const [res, setRes] = useState({ data: null, error: null, loading: null });
//   const [req, setReq] = useState();

//   useEffect(async () => {
//     if (!req) return;
//     try {
//       setRes({ data: null, error: null, loading: true });
//       const { data } = await axios(req);
//       setRes({ data, error: null, loading: false });
//     } catch (error) {
//       setRes({ data: null, error, loading: false });
//     }
//   }, [req]);

//   return [res, (...args) => setReq(fn(...args))];
// };

const useAPI = ({ url }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const callAPI = useCallback(
    payload => {
      setRes(prevState => ({ ...prevState, isLoading: true }));

      axios
        .patch(url, payload)
        .then(({ data }) => {
          setRes({ data, error: null, isLoading: false });
        })
        .catch(err => {
          setRes({ data: null, error: err, isLoading: false });
        });
    },
    [url]
  );

  return [res, callAPI];
};

export default useAPI;
