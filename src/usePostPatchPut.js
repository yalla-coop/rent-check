import { useState, useCallback } from 'react';
import axios from 'axios';

const useAPI = ({ url, method }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const callAPI = useCallback(
    payload => {
      setRes(prevState => ({ ...prevState, isLoading: true }));

      axios[method](url, payload)
        .then(({ data }) => {
          setRes({ data, error: null, isLoading: false });
        })
        .catch(err => {
          setRes({ data: null, error: err, isLoading: false });
        });
    },
    [url, method]
  );

  return [res, callAPI];
};

export default useAPI;
