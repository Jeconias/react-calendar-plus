import Arrow from '@components/Arrows/Arrows';
import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Arrow onClick={() => console.log('Left')} />
      <InfoContainer>
        <Month>Outubro</Month>
        <Year>2019</Year>
      </InfoContainer>
      <Arrow direction="right" onClick={() => console.log('Right')} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a363f;
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
