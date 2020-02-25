import React, { Fragment } from 'react';
import { NextDaysInterface } from '@src/core/interfaces/NextDaysInterface';
import Day from '@components/Day/Day';

const NextDays: React.FC<NextDaysInterface> = (props: NextDaysInterface) => {
  const { daysOfNextMonth } = props;
  const render: number[] = [];

  for (let i = 1; i <= daysOfNextMonth; i++) {
    render.push(i);
  }

  return (
    <Fragment>
      {render.map((day: number) => (
        <Day className="nextDay" day={day} key={`${day}-nextDay`}>
          {day}
        </Day>
      ))}
    </Fragment>
  );
};

export default NextDays;
