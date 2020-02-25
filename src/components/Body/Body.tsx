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
        <Day>{t('daysOfWeek.sun')}</Day>
        <Day>{t('daysOfWeek.mon')}</Day>
        <Day>{t('daysOfWeek.tue')}</Day>
        <Day>{t('daysOfWeek.wed')}</Day>
        <Day>{t('daysOfWeek.thu')}</Day>
        <Day>{t('daysOfWeek.fri')}</Day>
        <Day>{t('daysOfWeek.sat')}</Day>
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

export const ContainerDay = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Day = styled.div`
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

const DaysOfMonth = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, minmax(min-content, 27px));
  grid-auto-rows: 37px;
  align-items: center;
  background-color: ${({ theme }) => theme.body.month.backgroundColor};

  ${Day} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    padding: 2px;
    font-size: ${rem(13)};
    border-radius: 100%;
  }

  ${({ theme }) => css`
    & > .agoDay > ${Day} {
      color: ${theme.body.month.days.ago.color};
    }

    & > .currentDay > ${Day} {
      color: ${theme.body.month.days.current.color};
    }

    & > .nextDay > ${Day} {
      color: ${theme.body.month.days.next.color};
    }

    & > .today > ${Day} {
      color: ${theme.body.month.days.today.color};
      background-color: ${theme.body.month.days.today.backgroundColor};
    }
  `}
`;

const Container = styled.div`
  ${DaysOfWeek}, ${DaysOfMonth} {
    text-align: center;
    list-style: none;
    padding: 5px 20px;
    margin: 0;
  }
`;
