import React, { Fragment } from 'react';
import { AgoDaysInterface } from '@src/core/interfaces/AgoDaysInterface';
import { Day } from './Body';

const AgoDays: React.FC<AgoDaysInterface> = ({
  firstDayOfMonth,
  daysOfLastMonth,
  ...props
}) => {
  const render: number[] = [];
  for (let i = firstDayOfMonth; i > 0; i--) {
    render.push(daysOfLastMonth - (i - 1));
  }

  return (
    <div>
      {render.map((day: number) => (
        <Day className="dayAgo" key={`${day}-daysAgo`}>
          {day}
        </Day>
      ))}
    </div>
  );
};

export default AgoDays;
