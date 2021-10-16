import styled from 'styled-components';

export const Grid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px auto;
  height: 84.7vh;
  @media screen and (min-width: 700px) {
    height: calc(100vh - 111px);
    grid-template-columns: 350px auto;
    grid-template-rows: auto;
    gap: 1rem;
  }
  @media screen and (min-width: 1026px) {
    overflow: hidden;
  }
`;
