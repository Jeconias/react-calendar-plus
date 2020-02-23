import React from 'react';
import { ThemeProvider } from 'styled-components';

//TODO Add types
const basetheme = {
  header: {
    backgroundColor: '#333',
  },
};

const BaseTheme: React.FunctionComponent = (props) => {
  return <ThemeProvider theme={basetheme}>{props.children}</ThemeProvider>;
};

export default BaseTheme;
