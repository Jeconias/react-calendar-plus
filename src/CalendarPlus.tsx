import BaseTheme from '@components/BaseTheme/BaseTheme';
import Body from '@components/Body/Body';
import Header from '@components/Header/Header';
import CalendarPlusInterface from '@core/interfaces/CalendarPlusInterface';
import { nextMonth, clone, previousMonth } from '@core/utils/calendar';
import React, { useState } from 'react';
import styled from 'styled-components';

import CalendarContext, {
  CalendarContextInterface,
} from './CalendarPlusContext';

const CalendarPlus: React.FC<CalendarPlusInterface> = (
  props: CalendarPlusInterface,
) => {
  const [date, setDate] = useState(new Date());

  const handleNextMonth = () => {
    const nextM: number = nextMonth(date);
    const newDate: number = date.setFullYear(
      nextM === 0 ? date.getFullYear() + 1 : date.getFullYear(),
      nextM,
      date.getDate(),
    );
    setDate(new Date(newDate));
  };

  const handlePreviousMonth = () => {
    const previousM: number = previousMonth(date);
    const newDate: number = date.setFullYear(
      previousM === 11 ? date.getFullYear() - 1 : date.getFullYear(),
      previousM,
      date.getDate(),
    );
    setDate(new Date(newDate));
  };

  const context: CalendarContextInterface = {
    getDate: () => clone(date),
  };

  return (
    <CalendarContext.Provider value={context}>
      <BaseTheme>
        <Container>
          <Header
            handleNextMonth={handleNextMonth}
            handlePreviousMonth={handlePreviousMonth}
          />
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
