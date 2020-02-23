import React from 'react';

interface CalendarContextInterface {
  currentDate: Date;
}

const CalendarContext = React.createContext<CalendarContextInterface>({
  currentDate: new Date(),
});

export default CalendarContext;
