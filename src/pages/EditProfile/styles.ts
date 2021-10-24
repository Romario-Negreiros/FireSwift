import styled from 'styled-components';

import { Form as GlobalForm, FormBorder as GlobalFormBorder } from '../../global/styles';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormBorder = styled(GlobalFormBorder)`
  max-width: 500px;
`;

export const Form = styled(GlobalForm)`
  select {
    cursor: pointer;
    background-color: ${({ theme: { bgs } }) => bgs.tertiary};
  }
  option {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    background-color: ${({ theme: { bgs } }) => bgs.tertiary};
  }
  div input {
    width: 100%;
  }
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  padding: 1rem;
  @media screen and (min-width: 400px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  p {
    margin: 0;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
  }
`;
