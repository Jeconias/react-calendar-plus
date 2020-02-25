import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    header: {
      backgroundColor: string;
    };
    body: {
      week: {
        backgroundColor: string;
      };
      month: {
        backgroundColor: string;
        days: {
          ago: {
            backgroundColor: string;
            color: string;
          };
          current: string;
          next: string;
        };
      };
    };
  }
}
