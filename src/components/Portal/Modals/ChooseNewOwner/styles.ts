import styled from 'styled-components';

import { CloseModal as Reusable } from '../../../../global/styles';

export const Container = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 3rem 1rem;
  align-items: center;
  position: relative;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  height: 75vh;
  width: 80vw;
  max-height: 550px;
  max-width: 750px;
  
  h1 {
    font-size: 2rem;
    color: ${({theme: { fonts }}) => fonts.secondary};
    text-align: center;
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
    background: ${({theme: { bgs }}) => bgs.secondary};
    h2 {
      width: fit-content;
    }
    transition: transform .3s ease-in-out;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
  }
`;

export const CloseModal = styled(Reusable)`
  top: 0.5rem;
  right: 0.5rem;
`;
