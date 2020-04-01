import React, { Fragment, useContext } from 'react';
import { NextDaysInterface } from 'core/interfaces/NextDaysInterface';
import Day from 'components/Day/Day';
import CalendarContext from '../../CalendarPlusContext';
import { clone, nextMonth } from 'core/utils/calendar';

const NextDays: React.FC<NextDaysInterface> = (props: NextDaysInterface) => {
  const context = useContext(CalendarContext);

  const { daysOfNextMonth } = props;
  const { getDate } = context;
  const render: number[] = [];

  for (let i = 1; i <= daysOfNextMonth; i++) {
    render.push(i);
  }

  return (
    <Fragment>
      {render.map((day: number) => {
        const dateOfDay: Date = clone(getDate());
        dateOfDay.setDate(day);
        dateOfDay.setMonth(nextMonth(getDate()));
        dateOfDay.setFullYear(getDate().getFullYear());

        return (
          <Day className="nextDay" dateOfDay={dateOfDay} key={`${day}-nextDay`}>
            {day}
          </Day>
        );
      })}
    </Fragment>
  );
};

export default NextDays;
