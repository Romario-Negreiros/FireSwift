import styled from 'styled-components';

export const Grid = styled.main`
  display: grid;
  grid-template-rows: 50px auto auto;
  grid-template-columns: 1fr;
  padding: 5px;
  gap: 1rem;
  @media screen and (min-width: 700px) {
    height: calc(100vh - 105px);
    grid-template-columns: 350px auto;
    grid-template-rows: 50px auto;
  }
  @media screen and (min-width: 1026px) {
    overflow: hidden;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: 2rem;
  @media screen and (min-width: 700px) {
    grid-column: span 2;
  }
`;

export const View = styled.section`
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 1rem;
  min-height: 25vh;
  max-height: 100%;
  overflow: auto;
  h2 {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export const ManagingOptions = styled.ul`
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: fit-content;
  grid-row: 2;
  li {
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    :hover {
      opacity: 0.5;
    }
    p {
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.4rem;
    }
    .total {
      font-size: 1.2rem;
      text-decoration: underline purple;
    }
  }
`;
