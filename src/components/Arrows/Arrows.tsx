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
  width: 16px;
  height: 16px;
  /**border: 2px solid ${({ theme }) => theme.header.arrows.color};*/
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
    width: 4px;
    height: 4px;
    border: 2px solid ${({ theme }) => theme.header.arrows.color};
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
        left: -2px;
        transform: rotate(-45deg);
      `;
    }}
  }
`;
