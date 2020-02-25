import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { useTranslation } from 'react-i18next';
import {
  totalDaysOfMonth,
  firstDayMonth,
  previousMonth,
  clone,
} from '@core/utils/calendar';
import CalendarContext from '@src/CalendarPlusContext';
import AgoDays from './AgoDays';
import CurrentDays from './CurrentDays';
import NextDays from './NextDays';

const Body: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(CalendarContext);
  const cDate = context.getDate();

  const daysOfCurrentMonth: number = totalDaysOfMonth(cDate);
  const dateOfLastMonth = new Date(clone(cDate).setMonth(previousMonth(cDate)));
  const daysOfLastMonth: number = totalDaysOfMonth(dateOfLastMonth);
  const firstDayOfMonth: number = firstDayMonth(cDate) || 7;
  const daysOfNextMonth: number = 42 - (firstDayOfMonth + daysOfCurrentMonth);

  return (
    <Container>
      <DaysOfWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.sun')}</DayWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.mon')}</DayWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.tue')}</DayWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.wed')}</DayWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.thu')}</DayWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.fri')}</DayWeek>
        <DayWeek className="dayWeek">{t('daysOfWeek.sat')}</DayWeek>
      </DaysOfWeek>
      <DaysOfMonth>
        <AgoDays
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

const Container = styled.div``;

const DayWeek = styled.li`
  margin: 0 2px;
`;

const DaysOfWeek = styled.ul`
  display: grid;
  grid-column-gap: 2px;
  grid-template-columns: repeat(7, 1fr);
  padding: 5px 15px 10px;
  text-align: center;
  list-style: none;
  margin: 0;
  background-color: ${({ theme }) => theme.body.week.backgroundColor};
  color: ${({ theme }) => theme.body.week.color};
  border-bottom: 1px solid #ddd;

  & > .dayWeek {
    font-size: ${rem(14)};
    font-weight: 500;
  }
`;

const DaysOfMonth = styled.ul`
  position: relative;
  display: grid;
  grid-column-gap: 2px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, minmax(min-content, 27px));
  grid-auto-rows: 37px;
  align-items: center;
  list-style: none;
  padding: 0 15px;
  margin: 0;
  background-color: ${({ theme }) => theme.body.month.backgroundColor};

  & .day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    padding: 3px;
    font-size: ${rem(13)};
    border-radius: 100%;
    transition: 0.2s ease-in;
    cursor: pointer;

    :hover {
      background-color: #f0f0f0;
    }
  }

  ${({ theme }) => css`
    & > .agoDay > .day {
      color: ${theme.body.month.days.ago.color};
    }

    & > .currentDay > .day {
      color: ${theme.body.month.days.current.color};
    }

    & > .nextDay > .day {
      color: ${theme.body.month.days.next.color};
    }

    & > .today > .day {
      color: ${theme.body.month.days.selectedDay.color};
      font-weight: 700;
    }

    & > .selectedDay > .day {
      color: ${theme.body.month.days.today.color};
      background-color: ${theme.body.month.days.today.backgroundColor};
      font-weight: 700;
    }
  `}
`;
