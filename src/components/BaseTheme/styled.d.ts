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
          today: {
            backgroundColor: string;
            color: string;
          };
          ago: {
            backgroundColor: string;
            color: string;
          };
          current: {
            color: string;
          };
          next: {
            color: string;
          };
        };
      };
    };
  }
}
