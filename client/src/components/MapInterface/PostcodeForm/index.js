import React from "react";
import {
  Form,
  Closer,
  LargeCenteredImage,
  Warning,
  Button,
} from "./PostcodeForm.styles";
import logo from "../../../assets/logo.png";

const SearchForm = ({
  showWarning,
  onSubmit,
  closeSearch,
  postcode,
  onChange,
  postcodesLoading,
}) => {
  let inputClasses;
  if (showWarning) {
    inputClasses = "input-reset ba b--black-20 pa2 db mt2 dark-pink";
  } else {
    inputClasses = "input-reset ba b--black-20 pa2 db mt2";
  }
  return (
    <Form onSubmit={onSubmit}>
      <Closer onClick={() => closeSearch(false)}>&times;</Closer>
      <LargeCenteredImage src={logo} />
      <label htmlFor="postcode">
        Enter your postcode to compare business rental prices
      </label>
      <input
        className={inputClasses}
        type="text"
        id="postcode"
        name="postcode"
        value={postcode}
        onChange={onChange}
      />
      <Warning>{showWarning}</Warning>
      <Button type="submit">
        {/* TODO: Add spinning wheel instead of loading... */}
        {!postcodesLoading ? <div>Show me</div> : <div>Loading...</div>}
      </Button>
    </Form>
  );
};

export default SearchForm;
