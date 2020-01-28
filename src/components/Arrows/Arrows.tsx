import styled, { css } from 'styled-components';

import React from 'react';

interface Props {
  direction?: string;
  onClick?: () => void;
}

const Arrows: React.FunctionComponent<Props> = (
  props: Props,
): React.ReactElement => {
  return <Arrow {...props} />;
};

Arrows.defaultProps = {
  direction: 'left',
  onClick: () => {},
};

export default Arrows;

const Arrow = styled('div')<Props>`
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid #fff;
  border-radius: 100%;
  background-color: transparent;
  cursor: pointer;

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: -3px;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 6px;
    height: 6px;
    border: 2px solid #fff;
    border-right: none;
    border-bottom: none;
    ${({ direction }) => {
      if (direction === 'top')
        return css`
          right: 0;
          bottom: -3px;
          transform: rotate(45deg);
        `;
      if (direction === 'right')
        return css`
          right: 0;
          left: -3px;
          transform: rotate(135deg);
        `;
      if (direction === 'bottom')
        return css`
          right: 0;
          top: -3px;
          transform: rotate(-135deg);
        `;
      return css`
        transform: rotate(-45deg);
      `;
    }}
  }
`;
