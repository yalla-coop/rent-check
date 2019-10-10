// custom hook to be used for post, patch or put requests
// needs url, method (post, patch or put) and data to be passed on
// for example usage check Admin/Users/Table -> usePostPatchPut and manageUserStatusOnClick

import { useState, useCallback } from 'react';
import axios from 'axios';

const usePostPatchPut = ({ url, method }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const callAPI = useCallback(
    payload => {
      setRes(prevState => ({ ...prevState, isLoading: true }));

      return axios[method](url, payload)
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

export default usePostPatchPut;
