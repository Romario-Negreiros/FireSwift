import styled from 'styled-components';

import { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(1turn)
    }
`;

interface LoaderProps {
  size?: string;
}

export const LoaderSpin = styled.div<LoaderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ::after {
    content: '';
    width: ${({ size }) => size ? size : '5rem'};
    height: ${({ size }) => size ? size : '5rem'};
    border-radius: 50%;
    border: 10px solid #c1d5e4;
    border-top: 10px solid #8e2de2;
    animation: ${spin} 1s linear infinite;
  }
`;
