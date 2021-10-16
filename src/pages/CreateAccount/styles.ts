import styled from 'styled-components';

export const Container = styled.main`
  width: 100vw;
  height: calc(100vh + 15px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  @media screen and (min-width: 700px) {
    padding-top: 2rem;
  }
`;
