import Header from '@components/Header/Header';
import React from 'react';
import styled from 'styled-components';

const TMPDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const Body = () => {
  return (
    <Container>
      <DaysOfWeek>
        {TMPDays.map((v, k) => (
          <Day key={k}>{v}</Day>
        ))}
      </DaysOfWeek>
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
