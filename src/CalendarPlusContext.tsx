import React from 'react';

interface CalendarContextInterface {
  getDate(): Date;
  getSelectedDate(): Date;
  handleSelectedDate(newDate: Date): void;
}

const CalendarContext = React.createContext<CalendarContextInterface>({
  getDate: () => new Date(),
  getSelectedDate: () => new Date(),
  handleSelectedDate: (newDate: Date): void => console.log(newDate),
});

export default CalendarContext;
export { CalendarContextInterface };
