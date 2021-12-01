import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  h1 {
    width: 100%;
    text-align: center;
    font-size: 3rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
`;

export const Options = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 5rem;
  gap: 0.5rem;
  padding: clamp(0rem, 1.5vw, 10rem);
  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
  section {
    border: 1px solid ${({ theme: { border } }) => border.primary};
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    p {
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.4rem;
    }
    div {
      width: 4rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    :hover {
      opacity: 0.5;
    }
  }
`;

export const View = styled.section`
  width: 100%;
  min-height: 20vh;
  h2 {
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: ${({theme: { fonts }}) => fonts.secondary};
  }
  h3 {
    font-size: 1.5rem;
    color: ${({theme: { fonts }}) => fonts.secondary};
  }
`;

export const DefaultView = styled.section`
  min-width: 100%;
  min-height: 100%;
  background: red;
`;
