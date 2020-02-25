import BaseTheme from '@components/BaseTheme/BaseTheme';
import Body from '@components/Body/Body';
import Header from '@components/Header/Header';
import React, { useState } from 'react';

import CalendarContext from './CalendarPlusContext';
import { nextMonth } from '@core/utils/calendar';
import styled from 'styled-components';
import CalendarPlusInterface from '@core/interfaces/CalendarPlusInterface';

const CalendarPlus: React.FC<CalendarPlusInterface> = (
  props: CalendarPlusInterface,
) => {
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
        <Container>
          <Header handleNextMonth={handleNextMonth} />
          <Body />
        </Container>
      </BaseTheme>
    </CalendarContext.Provider>
  );
};

export default CalendarPlus;

const Container = styled.div`
  min-width: 320px;
  box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
  border-radius: 5px;
`;
