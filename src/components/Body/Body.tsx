import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { useTranslation } from 'react-i18next';
import {
  totalDaysOfMonth,
  firstDayMonth,
  lastMonth,
  clone,
} from '@core/utils/calendar';
import CalendarContext from '@src/CalendarPlusContext';
import AgoDays from './AgoDays';
import CurrentDays from './CurrentDays';
import NextDays from './NextDays';
import { AgoDaysInterface } from '@src/core/interfaces/AgoDaysInterface';

const Body: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(CalendarContext);
  const cDate = context.currentDate;

  const daysOfCurrentMonth: number = totalDaysOfMonth(cDate);
  const dateOfLastMonth = new Date(clone(cDate).setMonth(lastMonth(cDate)));
  const daysOfLastMonth: number = totalDaysOfMonth(dateOfLastMonth);
  const firstDayOfMonth: number = firstDayMonth(cDate) || 7;
  const daysOfNextMonth: number = 42 - (firstDayOfMonth + daysOfCurrentMonth);

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
        <StyledAgoDays
          firstDayOfMonth={firstDayOfMonth}
          daysOfLastMonth={daysOfLastMonth}
        />
        <CurrentDays daysOfCurrentMonth={daysOfCurrentMonth} />
        <NextDays daysOfNextMonth={daysOfNextMonth} />
      </DaysOfMonth>
    </Container>
  );
};

export default Body;

export const Day = styled.li`
  margin: 0 2px;
`;

const DaysOfWeek = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-top: 10px;
  background-color: ${({ theme }) => theme.body.week.backgroundColor};

  ${Day} {
    font-size: ${rem(14)};
    font-weight: 500;
  }
`;

const StyledAgoDays = styled(AgoDays)`
  background-color: red;
  & > div {
    background-color: blue;
    color: red;
  }
`;

const DaysOfMonth = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, minmax(min-content, 27px));
  grid-auto-rows: 37px;
  align-items: center;
  background-color: ${({ theme }) => theme.body.month.backgroundColor};

  ${Day} {
    font-size: ${rem(12)};
  }
`;

const Container = styled.div`
  ${DaysOfWeek}, ${DaysOfMonth} {
    text-align: center;
    list-style: none;
    padding: 5px 20px;
    margin: 0;
  }
`;
