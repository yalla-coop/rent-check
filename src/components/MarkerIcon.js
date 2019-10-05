import React from 'react';
import { useClassColor } from '../constants/colors';

export default ({ useClass }) => {
  return (
    <svg
      width="80px"
      height="80px"
      viewBox="0 0 42 42"
      className="donut"
      aria-labelledby="location label"
      role="img"
    >
      <circle
        className="donut-hole"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="white"
        role="presentation"
      />
      <circle
        className="donut-ring"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill={useClassColor[useClass]}
        strokeWidth="3"
        role="presentation"
      />
    </svg>
  );
};
