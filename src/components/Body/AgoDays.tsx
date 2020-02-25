import React, { Fragment } from 'react';
import { AgoDaysInterface } from '@src/core/interfaces/AgoDaysInterface';
import { ContainerDay, Day } from './Body';

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
        <ContainerDay className="agoDay" key={`${day}-agoDay`}>
          <Day>{day}</Day>
        </ContainerDay>
      ))}
    </Fragment>
  );
};

export default AgoDays;
