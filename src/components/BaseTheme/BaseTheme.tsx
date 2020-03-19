import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { darken } from 'polished';

//TODO Add types
const basetheme: DefaultTheme = {
  primary: '#f0f0f0',
  secondary: '#007D7F',
  support: {
    color: '#000',
    amount: 0.5,
  },
  supportMonth: {
    color: '#333',
    amount: 0.5,
  },
  supportText: '#333',
};

const BaseTheme: React.FunctionComponent = (props) => {
  return <ThemeProvider theme={basetheme}>{props.children}</ThemeProvider>;
};

export default BaseTheme;
