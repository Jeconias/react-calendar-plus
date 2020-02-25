import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    header: {
      backgroundColor: string;
      color: string;
      arrows: {
        color: string;
      };
    };
    body: {
      week: {
        backgroundColor: string;
        color: string;
      };
      month: {
        backgroundColor: string;
        days: {
          today: {
            backgroundColor: string;
            color: string;
          };
          selectedDay: {
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
