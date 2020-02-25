import React, { Fragment } from 'react';
import { NextDaysInterface } from '@src/core/interfaces/NextDaysInterface';
import { Day } from './Body';

const NextDays: React.FC<NextDaysInterface> = (props: NextDaysInterface) => {
  const { daysOfNextMonth } = props;
  const render: number[] = [];

  for (let i = 1; i <= daysOfNextMonth; i++) {
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

export default NextDays;
