import styled from 'styled-components';

export const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  height: 55vh;
  width: 85vw;
  max-width: 700px;
  padding: 1rem;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  @media screen and (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    width: 65vw;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    border: 0 none;
    outline: 0;
    padding: 1.5rem 0rem;
    width: 80%;
    font-size: 1.4rem;
    border-radius: 5px;
    color: ${({ theme: { fonts } }) => fonts.primary};
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      opacity: 0.5;
    }
    :active {
      transform: scale(0.9);
    }
  }
`;

export const Message = styled.li`
  grid-column: span 2;
  h1 {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 2rem;
    text-align: center;
  }
`;

export const Confirm = styled.li`
  grid-column: 1;
  button {
    background: ${({ theme: { gradients } }) => gradients.primary};
  }
`;

export const Cancel = styled.li`
  grid-column: 1;
  @media screen and (min-width: 450px) {
    grid-column: 2;
  }
  button {
    background: ${({ theme: { gradients } }) => gradients.secondary};
  }
`;
