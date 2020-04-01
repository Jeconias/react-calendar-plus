import BaseTheme from '@components/BaseTheme/BaseTheme';
import Body from '@components/Body/Body';
import Header from '@components/Header/Header';
import CalendarPlusInterface from '@core/interfaces/CalendarPlusInterface';
import { clone, nextMonth, previousMonth } from '@core/utils/calendar';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import CalendarContext, {
  CalendarContextInterface,
} from './CalendarPlusContext';
import BaseInput from './components/Form/BaseInput';
import Panel from './components/Panel/Panel';

const CalendarPlus: React.FC<CalendarPlusInterface> = ({
  selected,
  showConfig,
  onChangeDay,
}) => {
  const [date, setDate] = useState(selected || new Date());
  const [selectedDate, setSelectedDate] = useState(date);
  const [isOpenPanel, setIsOpenPanel] = useState<boolean>(true);

  const handleNextMonth = () => {
    const nextM: number = nextMonth(date);
    const newDate: number = date.setFullYear(
      nextM === 0 ? date.getFullYear() + 1 : date.getFullYear(),
      nextM,
      date.getDate(),
    );
    setDate(new Date(newDate));
  };

  const handlePreviousMonth = () => {
    const previousM: number = previousMonth(date);
    const newDate: number = date.setFullYear(
      previousM === 11 ? date.getFullYear() - 1 : date.getFullYear(),
      previousM,
      date.getDate(),
    );
    setDate(new Date(newDate));
  };

  const context: CalendarContextInterface = {
    getDate: () => clone(date),
    getSelectedDate: () => clone(selectedDate),
    handleSelectedDate: (newDate: Date): void => {
      if (onChangeDay) onChangeDay(newDate);
      setSelectedDate(newDate);
    },
  };

  return (
    <CalendarContext.Provider value={context}>
      <BaseTheme>
        <Container>
          <BaseInput date={selectedDate} />
          <ContainerCalendar>
            <Panel
              isOpen={isOpenPanel}
              onClose={() => setIsOpenPanel((prev) => !prev)}
            />
            <Config
              showConfig={showConfig}
              animateOnChange={isOpenPanel}
              onClick={() => setIsOpenPanel(!isOpenPanel)}
            />
            <Header
              handleNextMonth={handleNextMonth}
              handlePreviousMonth={handlePreviousMonth}
            />
            <Body />
          </ContainerCalendar>
        </Container>
      </BaseTheme>
    </CalendarContext.Provider>
  );
};

export default CalendarPlus;

const Container = styled.div`
  position: relative;
`;

const ContainerCalendar = styled.div`
  position: absolute;
  box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow: hidden;
`;

const Config = styled(({ showConfig, animateOnChange, ...props }) => (
  <div {...props}>
    <FontAwesomeIcon icon={faCog} size="sm" color="grey" />
  </div>
))`
  position: absolute;
  bottom: 8px;
  right: -23px;
  width: 15px;
  height: 15px;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s;
  & > svg {
    transition: 0.9s;
  }
  ${({ showConfig }) =>
    showConfig &&
    css`
      transform: translateX(-25px);
    `}

  ${({ animateOnChange }) =>
    animateOnChange &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;
