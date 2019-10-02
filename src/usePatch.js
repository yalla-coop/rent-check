import { useState, useCallback } from 'react';
import axios from 'axios';

const usePatch = ({ url }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const callAPI = useCallback(
    payload => {
      setRes(prevState => ({ ...prevState, isLoading: true }));
      axios
        .patch(url, payload)
        .then(({ data }) => {
          setRes({ data, isLoading: false, error: null });
        })
        .catch(error => {
          setRes({ data: null, isLoading: false, error });
        });
    },
    [url]
  );

  return [res, callAPI];
};

export default usePatch;
