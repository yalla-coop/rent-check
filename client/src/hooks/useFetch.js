// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const types = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
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

const useFetch = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: types.FETCH_INIT });
      try {
        const { data: res } = await axios.get(url);
        if (!didCancel) {
          dispatch({ type: types.FETCH_SUCCESS, payload: res });
        }
      } catch (error) {
        console.log(error);
        if (!didCancel) {
          dispatch({ type: types.FETCH_FAILURE });
        }
      }
    };

    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

export default useFetch;
