type TouchesPosition = {
  clientX: number;
  clientY: number;
};

type Language =
  | "deDE"
  | "enUS"
  | "esUS"
  | "filFIL"
  | "idID"
  | "inHI"
  | "jaJP"
  | "koKR"
  | "myMY"
  | "plPL"
  | "ptBR"
  | "ruRU"
  | "srRS"
  | "zhCN";

type Theme = "Default" | "Night" | "Royale";

type CalendarContainer = {
  localDate: {
    currentDate: Date;
    currentYear: number;
    currentMonth: number;
    currentDay: number;
  };
  lang: {
    daysWeek: string[];
    months: string[];
  };
  tags: {
    ids: {
      eventDetails: string;
      calendarHeaderYear: string;
      calendarHeaderMonth: string;
      hiddenDayEvents: string;
    };
    classes: {
      eventDetails: string;
      calendarEvent: string;
      calendarBody: string;
      calendarActionBefore: string;
      calendarActionAfter: string;
    };
  };
  settings: {
    show: boolean;
    language: {
      active: Language;
      available: Language[];
    };
    theme: {
      active: Theme;
      available: Theme[];
    };
  };
};

type languages = (lang: Language) => MethodsPublic;
type themes = (lang: Theme) => MethodsPublic;

type CalendarData = {
  name: string;
  date: string;
  time: string;
  author: string;
  link: string;
};

type MethodsPublic = {
  container: Function;
  data: Function;
  lang: languages;
  theme: themes;
};

type calendarConfig = {
  name: string;
};

export {
  calendarConfig,
  MethodsPublic,
  CalendarContainer,
  TouchesPosition,
  CalendarData
};
