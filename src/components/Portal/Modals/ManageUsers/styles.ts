import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  height: 75vh;
  width: 85vw;
  @media screen and (min-width: 600px) {
    height: 65vh;
    width: 60vw;
  }
`;

export const List = styled.ul`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  @media screen and (min-width: 600px) {
    width: 450px;
  }
  li {
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      width: fit-content;
    }
  }
`;
