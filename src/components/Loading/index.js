import React from 'react';
import { LargeCenteredImage, HeaderTitle, BoldPink } from './Loading.styles';
import logo from '../../assets/logo.png';

const Loading = () => {
  return (
    <div className="w-70 w-40-ns h-100 mw5 center flex flex-column items-center justify-center">
      <LargeCenteredImage src={logo} />
      <HeaderTitle>
        RENT
        <BoldPink>CHECK</BoldPink>
      </HeaderTitle>
    </div>
  );
};

export default Loading;
