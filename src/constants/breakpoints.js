// MEDIA QUERIES
// we still need to decide on the breakpoint we will use
// current suggestion is one breakpoint at the tablet size

export const sizeNum = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  mobileXL: 680,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
};

export const size = {
  mobileS: `${sizeNum.mobileS}px`,
  mobileM: `${sizeNum.mobileM}px`,
  mobileL: `${sizeNum.mobileL}px`,
  mobileXL: `${sizeNum.mobileXL}px`,
  tablet: `${sizeNum.tablet}px`,
  laptop: `${sizeNum.laptop}px`,
  laptopL: `${sizeNum.laptopL}px`,
  desktop: `${sizeNum.desktop}px`
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export const breakpointsMax = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  mobileXL: `(max-width: ${size.mobileXL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};
