import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

//TODO Add types
const basetheme: DefaultTheme = {
  header: {
    backgroundColor: '#333',
  },
  body: {
    week: {
      backgroundColor: '#f9fafc',
    },
    month: {
      backgroundColor: '#fff',
      days: {
        ago: {
          backgroundColor: 'red',
          color: 'blue',
        },
        current: '',
        next: '',
      },
    },
  },
};

const BaseTheme: React.FunctionComponent = (props) => {
  return <ThemeProvider theme={basetheme}>{props.children}</ThemeProvider>;
};

export default BaseTheme;
