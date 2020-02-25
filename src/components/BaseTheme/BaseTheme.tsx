import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

//TODO Add types
const basetheme: DefaultTheme = {
  header: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    arrows: {
      color: '#ccc',
    },
  },
  body: {
    week: {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    month: {
      backgroundColor: '#fff',
      days: {
        today: {
          backgroundColor: '#4F83D4',
          color: '#fff',
        },
        selectedDay: {
          color: '#000',
        },
        ago: {
          backgroundColor: 'red',
          color: '#e3e3e3',
        },
        current: {
          color: '#414141',
        },
        next: {
          color: '#e3e3e3',
        },
      },
    },
  },
};

const BaseTheme: React.FunctionComponent = (props) => {
  return <ThemeProvider theme={basetheme}>{props.children}</ThemeProvider>;
};

export default BaseTheme;
