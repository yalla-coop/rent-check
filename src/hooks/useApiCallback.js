// custom hook to be used for post, patch or put requests
// needs url, method (post, patch or put) and data to be passed on
// for example usage check Admin/Users/Table -> usePostPatchPut and manageUserStatusOnClick

import { useState, useCallback, useReducer } from 'react';
import axios from 'axios';

const useApiCallback = ({ url, method }) => {
  const types = {
    FETCH_INIT: 'FETCH_INIT',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE',
  };

  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case types.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case types.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case types.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const callApi = useCallback(
    const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
    payload => {
      setIsLoading(true);
      return axios[method](url, payload)
        .then(({ data }) => {
          setResponse({ data });
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    },
    [url, method]
  );

  return [callApi, response, isLoading, error];
};

export default useApiCallback;
