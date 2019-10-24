// eslint-disable-next-line no-unused-vars
import { useState, useCallback, useReducer } from "react";
import axios from "axios";

const types = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE"
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
        data: action.payload
      };
    case types.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload
      };
    default:
      throw new Error();
  }
};

const useApiCallback = (method, url, initialData) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  const apiCallback = useCallback(
    payload => {
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: types.FETCH_INIT });
        try {
          const { data } = await axios[method](url, payload);
          if (!didCancel) {
            dispatch({ type: types.FETCH_SUCCESS, payload: data });
          }
        } catch (error) {
          if (!didCancel) {
            if (error.response.data.message) {
              dispatch({
                type: types.FETCH_FAILURE,
                payload: error.response.data.message
              });
            } else {
              dispatch({
                type: types.FETCH_FAILURE,
                payload: error.response.data
              });
            }
          }
        }
      };

      fetchData();
      return () => {
        didCancel = true;
      };
    },
    [method, url]
  );

  return [state, apiCallback];
};

export default useApiCallback;
