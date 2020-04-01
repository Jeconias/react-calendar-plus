import React, { Fragment, useContext } from 'react';
import { AgoDaysInterface } from 'core/interfaces/AgoDaysInterface';
import Day from 'components/Day/Day';
import CalendarContext from '../../CalendarPlusContext';
import { clone, previousMonth } from 'core/utils/calendar';

const AgoDays: React.FC<AgoDaysInterface> = ({
  firstDayOfMonth,
  daysOfLastMonth,
}) => {
  const context = useContext(CalendarContext);
  const { getDate } = context;

  const render: number[] = [];
  for (let i = firstDayOfMonth; i > 0; i--) {
    render.push(daysOfLastMonth - (i - 1));
  }

  return (
    <Fragment>
      {render.map((day: number) => {
        const dateOfDay: Date = clone(getDate());
        dateOfDay.setDate(day);
        dateOfDay.setMonth(previousMonth(getDate()));
        dateOfDay.setFullYear(getDate().getFullYear());
        return (
          <Day className="agoDay" dateOfDay={dateOfDay} key={`${day}-agoDay`}>
            {day}
          </Day>
        );
      })}
    </Fragment>
  );
};

export default AgoDays;
