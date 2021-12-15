import styled from 'styled-components';

import { Message as Reusable } from '../ChatsList/styles';
import { Input as Reusable2 } from '../../global/styles';

export const Container = styled.section`
  width: 100%;
  max-height: 100%;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    display: flex;
    flex-direction: column;
    max-height: 75.5vh;
    overflow: auto;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

interface MessageProps {
  status: string;
}

export const Message = styled(Reusable)<MessageProps>`
  align-self: ${({ status }) => (status === 'sent' ? 'flex-end' : 'flex-start')};
  width: fit-content;
  max-width: 80%;
  word-wrap: wrap;
  padding: 0.6rem;
  position: relative;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  border-radius: 5px;
  span {
    width: 80%;
  }
  .status {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    width: 15px;
    height: 15px;
  }
`;

export const Input = styled(Reusable2)`
  background: ${({ theme: { bgs } }) => bgs.secondary};
`;
