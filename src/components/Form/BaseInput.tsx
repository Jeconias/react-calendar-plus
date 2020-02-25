import React from 'react';
import { BaseInputInterface } from '@src/core/interfaces/BaseInputInterface';
import { dateFormat, addLeftZero } from '@src/core/utils/calendar';
import styled from 'styled-components';

const BaseInput: React.FC<BaseInputInterface> = ({ date, withZero }) => {
  const value = dateFormat(date, withZero);
  return (
    <Input type="text" value={value} onChange={() => console.log('//TODO')} />
  );
};

export default BaseInput;

const Input = styled('input')`
  box-sizing: border-box;
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px 10px;
  margin-bottom: 15px;
`;
