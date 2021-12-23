import styled, { keyframes } from 'styled-components';

const fillBar = keyframes`
  from {
    width: current;
  }
  to {
    width: 100%;
  }
`;

export const Container = styled.ul`
  background: ${({ theme: { bgs } }) => bgs.secondary};
  border: 1px solid ${({ theme: { border } }) => border.primary};
  width: 100%;
  padding: 1rem !important;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 1026px) {
    padding: 0.2rem !important;
    overflow: hidden !important;
  }
`;

interface ProgressProps {
  width?: number;
}

export const Progress = styled.li<ProgressProps>`
  width: 60%;
  height: 50%;
  display: flex;
  gap: 1rem;
  align-items: center;
  div {
    border-radius: 10px;
  }
  .progress {
    height: 100%;
    width: 100%;
    background: ${({ theme: { gradients } }) => gradients.primary};
    padding: 0.1rem;
  }
  .invisible {
    height: 100%;
    width: 100%;
    padding: 0.1rem;
    background: ${({ theme: { bgs } }) => bgs.secondary};
  }
  .progress-bar {
    height: 100%;
    width: ${({ width }) => width ? `${width}%` : '0%'};
    background: ${({ theme: { gradients } }) => gradients.primary};

  }
  .animate-bar {
    animation: ${fillBar} 30s linear;
  }
  .timer {
    color: ${({theme: { fonts }}) => fonts.primary};
    font-size: 1.5rem;
  }
`;

export const Options = styled.li`
  display: flex;
  gap: 1rem;
  align-items: center;
  div {
    cursor: pointer;
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    border-radius: 50%;
    transition: filter ease-in-out 0.3s;
    :hover {
      filter: brightness(2);
    }
    :hover svg {
      transform: scale(1.1);
    }
  }
`;