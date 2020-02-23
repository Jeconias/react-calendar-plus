import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { totalDaysOfMonth } from '@core/utils/calendar';
import CalendarContext from '@src/CalendarPlusContext';

const Body = () => {
  const { t } = useTranslation();
  const context = useContext(CalendarContext);

  const totalDaysMonth: number = totalDaysOfMonth(context.currentDate);
  const totalDaysLastMonth: number = totalDaysOfMonth(
    new Date(context.currentDate.setMonth(context.currentDate.getMonth() - 1)),
  );
  const totalDaysNextMonth: number =
    42 - (totalDaysOfMonth(context.currentDate) + totalDaysMonth);

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
      <DaysOfMonth></DaysOfMonth>
    </Container>
  );
};

export default Body;

const Container = styled.div`
  background-color: #e57d0d;
  padding: 5px 20px;
`;

const DaysOfWeek = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Day = styled.li`
  margin: 0 5px;
`;

const DaysOfMonth = styled.div``;
