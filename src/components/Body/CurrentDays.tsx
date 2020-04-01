import React, { Fragment, useContext } from 'react';
import { CurrentDaysInterface } from 'core/interfaces/CurrentDaysInterface';
import CalendarContext from '../../CalendarPlusContext';
import Day from 'components/Day/Day';

const CurrentDays: React.FC<CurrentDaysInterface> = (
  props: CurrentDaysInterface,
) => {
  const context = useContext(CalendarContext);

  const { getDate, getSelectedDate } = context;
  const { daysOfCurrentMonth } = props;

  const render: number[] = [];
  for (let i = 1; i <= daysOfCurrentMonth; i++) {
    render.push(i);
  }

  return (
    <Fragment>
      {render.map((day: number) => {
        const todayClass = day === getDate().getDate() ? 'today' : '';
        const selectedDayClass =
          day === getSelectedDate().getDate() ? 'selectedDay' : '';

        return (
          <Day
            className={`currentDay ${todayClass} ${selectedDayClass}`}
            day={day}
            key={`${day}-currentDay`}>
            {day}
          </Day>
        );
      })}
    </Fragment>
  );
};

export default CurrentDays;
