import React, { Fragment, useContext } from 'react';
import { CurrentDaysInterface } from 'core/interfaces/CurrentDaysInterface';
import CalendarContext from '../../CalendarPlusContext';
import Day from 'components/Day/Day';
import { clone } from 'core/utils/calendar';

const CurrentDays: React.FC<CurrentDaysInterface> = (
  props: CurrentDaysInterface,
) => {
  const context = useContext(CalendarContext);

  const { getDate } = context;
  const { daysOfCurrentMonth } = props;

  const render: number[] = [];
  for (let i = 1; i <= daysOfCurrentMonth; i++) {
    render.push(i);
  }

  return (
    <Fragment>
      {render.map((day: number) => {
        const dateOfDay: Date = clone(getDate());
        dateOfDay.setDate(day);
        const todayClass = day === getDate().getDate() ? 'today' : '';

        return (
          <Day
            className={`currentDay ${todayClass}`}
            dateOfDay={dateOfDay}
            key={`${day}-currentDay`}>
            {day}
          </Day>
        );
      })}
    </Fragment>
  );
};

export default CurrentDays;
