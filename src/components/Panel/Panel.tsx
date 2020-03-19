import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { PanelInterface } from '@src//core/interfaces/PanelInterface';
import Select from '@components/Select/Select';
import CheckBox from '../Checkbox/CheckBox';

//TODO Add translation
//TODO Implement method to change language
const Panel: React.FC<PanelInterface> = ({ isOpen }) => {
  const [language, setLanguage] = useState<string>('en-us');

  const handleOnChangeLanguage = (selected: string) => {
    console.log(selected);
    setLanguage(selected);
    //TODO Implement
  };

  return (
    <Container isOpen={isOpen}>
      <ul>
        <li>
          <Select
            initValue={language}
            onChange={handleOnChangeLanguage}
            label="Language">
            <option value="pt-br">pt-BR</option>
            <option value="en-us">en-US</option>
          </Select>
        </li>
        <li>
          <CheckBox label="anyConfig" />
        </li>
      </ul>
    </Container>
  );
};

export default Panel;

const Container = styled.div<{ isOpen: Boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: 0.3s;
  transform: translateX(calc(100vw + 500px));
  background-color: #fff;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(0);
    `}

  & > ul {
    height: 100%;
    margin: 0;
    padding: 15px;
    box-sizing: border-box;
    list-style: none;

    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
  }
`;
