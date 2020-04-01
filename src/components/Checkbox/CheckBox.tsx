import React, { useState, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { rem, darken } from 'polished';
import { CheckBoxInterface } from 'core/interfaces/CheckBoxInterface';

const CheckBox: React.FC<CheckBoxInterface> = ({ label, onChange }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = () => {
    setChecked(!checked);
    if (onChange) onChange();
  };

  return (
    <Fragment>
      <Label onClick={() => handleChange()}>{label}</Label>
      <Container checked={checked} onClick={() => handleChange()}>
        <input type="checkbox" defaultChecked={checked} />
      </Container>
    </Fragment>
  );
};

export default CheckBox;

const Container = styled(({ checked, children, ...props }) => (
  <div {...props}>{children}</div>
))<{
  checked: boolean;
}>`
  position: relative;
  width: 30px;
  height: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: ${({ theme }) => darken(0.5, theme.primary)};
    transition: 0.3s;
    ${({ checked }) =>
      checked &&
      css`
        background: ${({ theme }) => theme.secondary};
        transform: translateX(15px);
      `}
  }
  & > input {
    display: none;
  }
`;

const Label = styled.label`
  font-size: ${rem(14)};
  color: ${({ theme }) => theme.supportText};
  cursor: pointer;
`;
