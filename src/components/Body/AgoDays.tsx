import React, { Fragment } from 'react';
import { AgoDaysInterface } from 'core/interfaces/AgoDaysInterface';
import Day from 'components/Day/Day';

const AgoDays: React.FC<AgoDaysInterface> = ({
  firstDayOfMonth,
  daysOfLastMonth,
}) => {
  const render: number[] = [];
  for (let i = firstDayOfMonth; i > 0; i--) {
    render.push(daysOfLastMonth - (i - 1));
  }

  return (
    <Fragment>
      {render.map((day: number) => (
        <Day className="agoDay" day={day} key={`${day}-agoDay`}>
          {day}
        </Day>
      ))}
    </Fragment>
  );
};

export default AgoDays;
