import React, { Fragment } from 'react';
import { Day } from './Body';
import { CurrentDaysInterface } from '@src/core/interfaces/CurrentDaysInterface';

const CurrentDays: React.FC<CurrentDaysInterface> = (
  props: CurrentDaysInterface,
) => {
  const { daysOfCurrentMonth } = props;

  const render: number[] = [];
  for (let i = 1; i <= daysOfCurrentMonth; i++) {
    render.push(i);
  }

  return (
    <Fragment>
      {render.map((day: number) => (
        <Day key={`${day}-daysAgo`}>{day}</Day>
      ))}
    </Fragment>
  );
};

export default CurrentDays;
