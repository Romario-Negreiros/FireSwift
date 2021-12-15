import styled from 'styled-components';

export const Container = styled.ul`
  position: absolute;
  top: 4.5rem;
  z-index: 15;
  width: 100%;
  height: 75vh;
  max-height: 75vh;
  overflow: auto;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  border: 1px solid ${({ theme: { border } }) => border.primary};
  border-radius: 0.5rem;
`;

export const Result = styled.li`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 1rem;
`;

export const Options = styled.ul`
  width: fit-content;
  display: flex;
  gap: 2rem;
  align-items: center;
`;
