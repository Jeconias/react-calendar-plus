import BaseTheme from '@components/BaseTheme/BaseTheme';
import Body from '@components/Body/Body';
import Header from '@components/Header/Header';
import React, { useState } from 'react';

import CalendarContext from './CalendarPlusContext';
import { nextMonth } from './core/utils/calendar';

const CalendarPlus: React.FunctionComponent = () => {
  const [date, setDate] = useState(new Date(2020, 2, 24));

  const handleNextMonth = () => {
    const nextM: number = nextMonth(date);
    const newDate: number = date.setFullYear(
      nextM === 0 ? date.getFullYear() + 1 : date.getFullYear(),
      nextM,
      date.getDate(),
    );
    console.log(date);
    setDate(new Date(newDate));
  };

  return (
    <CalendarContext.Provider value={{ currentDate: date }}>
      <BaseTheme>
        <Header handleNextMonth={handleNextMonth} />
        <Body />
      </BaseTheme>
    </CalendarContext.Provider>
  );
};

export default CalendarPlus;
