export const breakpoints = {
  mobile: {
    min: '1px',
    max: '767px',
  },
  tablet: {
    min: '768px',
    max: '1199px',
  },
  desktop: {
    min: '1200px',
    max: 'none',
  },
};

export const mediaQuery = {
  mobile: `@media (max-width: ${breakpoints.mobile.max})`,
  tablet: `@media (min-width: ${breakpoints.tablet.min}) and (max-width: ${breakpoints.tablet.max})`,
  desktop: `@media (min-width: ${breakpoints.desktop.min})`,
};
