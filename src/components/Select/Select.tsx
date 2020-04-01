import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { SelectInterface } from 'core/interfaces/SelectInterface';

const Select: React.FC<SelectInterface> = ({
  label,
  initValue,
  onChange,
  children,
}) => {
  return (
    <Fragment>
      <Label>{label}</Label>
      <SelectContainer>
        <Arrow />
        <StyledSelect
          value={initValue}
          onChange={(e) => onChange && onChange(e.target.value)}>
          {children}
        </StyledSelect>
      </SelectContainer>
    </Fragment>
  );
};

export default Select;

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  padding: 2px 15px 2px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-progress-appearance: none;
  appearance: none;
  background-color: transparent;
  border-radius: 3px;
  font-size: ${rem(12)};
  cursor: pointer;
`;

const Arrow = styled.div`
  position: absolute;
  top: -3px;
  right: 5px;
  bottom: 0;
  margin: auto;
  height: 5px;
  width: 5px;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
`;

const Label = styled.label`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.supportText};
  cursor: pointer;
`;
