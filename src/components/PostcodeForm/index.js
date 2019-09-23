/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {
  Form,
  Closer,
  LargeCenteredImage,
  Warning,
  Button,
} from './PostcodeForm.styles';
import logo from '../../assets/logo.png';

export default class SearchForm extends Component {
  render() {
    const {
      showWarning,
      onSubmit,
      closeSearch,
      postcode,
      onChange,
    } = this.props;
    let inputClasses;
    if (showWarning) {
      inputClasses = 'input-reset ba b--black-20 pa2 db mt2 dark-pink';
    } else {
      inputClasses = 'input-reset ba b--black-20 pa2 db mt2';
    }
    return (
      <Form onSubmit={onSubmit}>
        <Closer onClick={closeSearch}>&times;</Closer>
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
        <Button type="submit">Show me</Button>
      </Form>
    );
  }
}
