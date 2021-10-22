import styled from 'styled-components';

import { Form as GlobalForm } from '../../global/styles';

export const Form = styled(GlobalForm)`
  select {
    cursor: pointer;
    background-color: ${({ theme: { bgs } }) => bgs.tertiary};
  }
  option {
    color: ${({theme: { fonts }}) => fonts.secondary};
    background-color: ${({theme: { bgs }}) => bgs.tertiary};
  }
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 1rem;
  @media screen and (min-width: 400px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  p {
    margin: 0;
    color: ${({theme: { fonts }}) => fonts.secondary};
    font-size: 1.4rem;
  }
`;
