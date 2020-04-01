import React, { useContext } from 'react';
import styled from 'styled-components';
import { DayInterface } from 'core/interfaces/DayInterface';
import CalendarContext from '../../CalendarPlusContext';

const Day: React.FC<DayInterface> = ({ children, day, className }) => {
  const context = useContext(CalendarContext);
  const { getDate, handleSelectedDate } = context;

  return (
    <Container className={className}>
      <DayElement
        className="day"
        onClick={() => {
          handleSelectedDate(new Date(getDate().setDate(day)));
        }}>
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
