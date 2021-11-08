import styled from 'styled-components';

export const Grid = styled.main`
  display: grid;
  grid-template-rows: 120px 180px auto;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 5px;
  width: 100%;
  min-height: 100vh;
  @media screen and (min-width: 700px) {
    grid-template-rows: 60px 180px auto;
  }
`;
