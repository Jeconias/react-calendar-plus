import Arrow from '@components/Arrows/Arrows';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import CalendarContext from '@src/CalendarPlusContext';
import { useTranslation } from 'react-i18next';

interface CalendarHeaderInterface {
  handleNextMonth: Function;
}

const Header = (props: CalendarHeaderInterface) => {
  const { t } = useTranslation();

  const context = useContext(CalendarContext);
  const cDate = context.currentDate;

  const { handleNextMonth } = props;

  return (
    <Container>
      <Arrow onClick={() => console.log('Left')} />
      <InfoContainer>
        <Month>{t(`months.${cDate.getMonth()}`)}</Month>
        <Year>{cDate.getFullYear()}</Year>
      </InfoContainer>
      <Arrow direction="right" onClick={() => handleNextMonth()} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.header.backgroundColor};
  padding: 10px 20px;
`;
const InfoContainer = styled.div`
  color: #fff;
`;
const Month = styled.span`
  margin: 0 2px;
  font-size: 1.1rem;
  font-weight: 600;
`;
const Year = styled.span`
  margin: 0 2px;
`;
