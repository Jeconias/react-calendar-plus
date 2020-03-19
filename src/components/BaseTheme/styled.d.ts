import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    support: {
      color: string;
      amount: number;
    };
    supportMonth: {
      color: string;
      amount: number;
    };
    supportText: string;
  }
}
