import BaseTheme from '@components/BaseTheme/BaseTheme';
import Body from '@components/Body/Body';
import Header from '@components/Header/Header';
import CalendarPlusInterface from '@core/interfaces/CalendarPlusInterface';
import { clone, nextMonth, previousMonth } from '@core/utils/calendar';
import React, { useState } from 'react';
import styled from 'styled-components';

import CalendarContext, {
  CalendarContextInterface,
} from './CalendarPlusContext';
import BaseInput from './components/Form/BaseInput';

const CalendarPlus: React.FC<CalendarPlusInterface> = ({
  selected,
  onChangeDay,
}) => {
  const [date, setDate] = useState(selected || new Date());
  const [selectedDate, setSelectedDate] = useState(date);

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
    getSelectedDate: () => clone(selectedDate),
    handleSelectedDate: (newDate: Date): void => {
      if (onChangeDay) onChangeDay(newDate);
      setSelectedDate(newDate);
    },
  };

  return (
    <CalendarContext.Provider value={context}>
      <BaseTheme>
        <Container>
          <BaseInput date={selectedDate} />
          <ContainerCalendar>
            <Header
              handleNextMonth={handleNextMonth}
              handlePreviousMonth={handlePreviousMonth}
            />
            <Body />
          </ContainerCalendar>
        </Container>
      </BaseTheme>
    </CalendarContext.Provider>
  );
};

export default CalendarPlus;

const Container = styled.div`
  position: relative;
`;

const ContainerCalendar = styled.div`
  position: absolute;
  width: 220px;
  box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow: hidden;
`;
