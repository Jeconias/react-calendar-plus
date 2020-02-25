import React from 'react';

interface CalendarContextInterface {
  getDate(): Date;
}

const CalendarContext = React.createContext<CalendarContextInterface>({
  getDate: () => new Date(),
});

export default CalendarContext;
export { CalendarContextInterface };
