import styled from 'styled-components';

import { Form as GlobalForm } from '../../global/styles';

interface StyledProps {
  theme: string;
}

export const Form = styled(GlobalForm)<StyledProps>`
  select {
    cursor: pointer;
    background-image: ${props => (
      props.theme === 'light' ?
      "url(data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>)" :
      "url(data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>)"
    )};
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
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
