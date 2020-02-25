import React, { Fragment, useContext } from 'react';
import { ContainerDay, Day } from './Body';
import { CurrentDaysInterface } from '@src/core/interfaces/CurrentDaysInterface';
import CalendarContext from '@src/CalendarPlusContext';

const CurrentDays: React.FC<CurrentDaysInterface> = (
  props: CurrentDaysInterface,
) => {
  const context = useContext(CalendarContext);
  const cDate = context.getDate();
  const { daysOfCurrentMonth } = props;

  const render: number[] = [];
  for (let i = 1; i <= daysOfCurrentMonth; i++) {
    render.push(i);
  }

  return (
    <Fragment>
      {render.map((day: number) => (
        <ContainerDay
          className={`currentDay ${day === cDate.getDate() ? 'today' : ''}`}
          key={`${day}-currentDay`}>
          <Day>{day}</Day>
        </ContainerDay>
      ))}
    </Fragment>
  );
};

export default CurrentDays;
