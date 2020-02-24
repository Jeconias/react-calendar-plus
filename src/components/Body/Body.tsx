import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useTranslation } from 'react-i18next';
import {
  totalDaysOfMonth,
  firstDayMonth,
  lastMonth,
  clone,
} from '@core/utils/calendar';
import CalendarContext from '@src/CalendarPlusContext';

//TODO Bug when render march month
const Body = () => {
  const { t } = useTranslation();
  const context = useContext(CalendarContext);
  const cDate = context.currentDate;

  const daysOfCurrentMonth: number = totalDaysOfMonth(cDate);
  const dateOfLastMonth = new Date(clone(cDate).setMonth(lastMonth(cDate)));
  const daysOfLastMonth: number = totalDaysOfMonth(dateOfLastMonth);
  const firstDayOfMonth = firstDayMonth(cDate);
  const daysOfNextMonth: number = 42 - (firstDayOfMonth + daysOfCurrentMonth);

  const AgoDays: React.FC = () => {
    const render: number[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      render.push(daysOfLastMonth - (i - 1));
    }

    return (
      <Fragment>
        {render.map((day: number) => (
          <Day key={`${day}-daysAgo`}>{day}</Day>
        ))}
      </Fragment>
    );
  };

  const CurrentDays: React.FC = () => {
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

  const NextDays: React.FC = () => {
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

  return (
    <Container>
      <DaysOfWeek>
        <Day>{t('daysOfWeek.sun')}</Day>
        <Day>{t('daysOfWeek.mon')}</Day>
        <Day>{t('daysOfWeek.tue')}</Day>
        <Day>{t('daysOfWeek.wed')}</Day>
        <Day>{t('daysOfWeek.thu')}</Day>
        <Day>{t('daysOfWeek.fri')}</Day>
        <Day>{t('daysOfWeek.sat')}</Day>
      </DaysOfWeek>
      <DaysOfMonth>
        <AgoDays />
        <CurrentDays />
        <NextDays />
      </DaysOfMonth>
    </Container>
  );
};

export default Body;

const Day = styled.li``;

const DaysOfWeek = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-top: 10px;

  ${Day} {
    margin: 0 5px;
    font-size: ${rem(14)};
  }
`;

const DaysOfMonth = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, minmax(min-content, 27px));
  grid-auto-rows: 37px;
  padding-bottom: 20px;
  align-items: center;
  padding-top: 10px;

  ${Day} {
    font-size: ${rem(12)};
  }
`;

const Container = styled.div`
  background-color: #e57d0d;
  padding: 5px 20px;

  ${DaysOfWeek}, ${DaysOfMonth} {
    text-align: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
