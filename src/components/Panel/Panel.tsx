import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PanelInterface } from 'core/interfaces/PanelInterface';
import Select from 'components/Select/Select';
import CheckBox from 'components/Checkbox/CheckBox';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

//TODO Add translation
//TODO Implement method to change language
const Panel: React.FC<PanelInterface> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const handleOnChangeLanguage = (selected: string) => {
      i18n.changeLanguage(selected, (error) => {
        if (error) {
          console.log('//TODO Solve it');
          return;
        }
      });
    };
    handleOnChangeLanguage(language);
  }, [language]);

  return (
    <Container isOpen={isOpen}>
      <ul>
        <li>
          <Select
            initValue={language}
            onChange={(selected) => setLanguage(selected)}
            label={t('calendarPanel.features.languages')}>
            {i18n.languages.map((language, k) => (
              <option key={k} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </li>
        <li>
          <CheckBox label="anyConfig" />
        </li>
      </ul>
      <ArrowContainer onClick={() => onClose()}>
        <FontAwesomeIcon icon={faArrowLeft} size="sm" color="grey" />
      </ArrowContainer>
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
  z-index: 2;
  transition: 0.3s;
  transform: translateX(calc(100vw + 500px));
  background-color: #fff;
  padding: 15px;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(0);
    `}

  & > ul {
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    padding: 0;

    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 8px;
  cursor: pointer;
`;
