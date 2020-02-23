import BaseTheme from '@components/BaseTheme/BaseTheme';
import Body from '@components/Body/Body';
import Header from '@components/Header/Header';
import React from 'react';

import CalendarContext from './CalendarPlusContext';

const CalendarPlus: React.FunctionComponent = () => {
  const TMPDate = new Date();

  return (
    <CalendarContext.Provider value={{ currentDate: TMPDate }}>
      <BaseTheme>
        <Header />
        <Body />
      </BaseTheme>
    </CalendarContext.Provider>
  );
};

export default CalendarPlus;
