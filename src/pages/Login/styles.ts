import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: calc(100vh - 111px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  padding: 3rem;
`;

export const CreateAccount = styled.section`
  width: 100%;
  max-width: 400px;
  grid-column: 2;
  display: none;
  div {
    width: 100%;
  }
  h1 {
    width: 100%;
    font-size: 6rem;
    background-image: linear-gradient(to right, #8e2de2, #4a00e0);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-indent: 6rem;
    @media screen and (min-width: 900px) {
      text-indent: 0;
      font-size: 8rem;
    }
  }
  h1:nth-child(2) {
    text-indent: 8rem;
    @media screen and (min-width: 900px) {
      text-indent: 3rem;
    }
  }
  @media screen and (min-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover h1 {
      opacity: 0.5;
    }
  }
`;

