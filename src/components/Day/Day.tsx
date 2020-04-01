import React, { useContext } from 'react';
import styled from 'styled-components';
import { DayInterface } from 'core/interfaces/DayInterface';
import CalendarContext from '../../CalendarPlusContext';
import { compareDate } from 'core/utils/calendar';

const Day: React.FC<DayInterface> = ({ children, dateOfDay, className }) => {
  const context = useContext(CalendarContext);
  const { handleSelectedDate, getSelectedDate } = context;

  const selectedDayClass = compareDate(dateOfDay, getSelectedDate())
    ? 'selectedDay'
    : '';

  return (
    <Container className={`${className} ${selectedDayClass}`}>
      <DayElement className="day" onClick={() => handleSelectedDate(dateOfDay)}>
        {children}
      </DayElement>
    </Container>
  );
};

export default Day;

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayElement = styled.div`
  margin: 0 2px;
`;
