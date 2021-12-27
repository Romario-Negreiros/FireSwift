import styled from 'styled-components';

import { Message as Reusable } from '../../../ChatsList/styles';
import { Media as Reusable2 } from '../../../Post/styles';

interface ContainerProps {
  status: string;
}

export const Container = styled(Reusable)<ContainerProps>`
  align-self: ${({ status }) => (status === 'owner' ? 'flex-end' : 'flex-start')};
  width: fit-content;
  max-width: 80%;
  padding: 0.6rem;
  position: relative;
  background: ${({ status }) =>
    status === 'owner'
      ? 'linear-gradient(to right, #8e2de2, #4a00e0)'
      : 'linear-gradient(to right, #ed213a, #93291e)'};
  border-radius: 5px;
  display: flex;
  flex-flow: row wrap;
  div {
    word-break: break-all;
  }
  span {
    font-size: 1.4rem;
    word-wrap: wrap;
    color: ${({ theme: { fonts } }) => fonts.primary};
  }
`;

export const Reply = styled.div`
  background: unset;
  color: ${({ theme: { fonts } }) => fonts.primary};
  backdrop-filter: grayscale(0.5);
  width: 100%;
  padding: 0.5rem;
`;

export const Options = styled.ul<ContainerProps>`
  display: flex;
  position: absolute;
  bottom: 0;
  ${({ status }) => (status === 'owner' ? 'left: -4.5rem;' : 'right: -4.5rem;')};
  align-items: center;
  gap: 1rem;
  svg {
    font-size: 1.5rem;
  }
  li {
    cursor: pointer;
  }
  li:hover svg {
    transform: scale(1.1);
  }
`;

export const Media = styled(Reusable2)`
  width: 100% !important;
  ul.mediaList {
    overflow: unset;
    grid-template-columns: unset;
    img {
      max-width: 100%;
      width: 500px;
      height: fit-content;
      object-fit: contain;
    }
  }
  video {
    height: fit-content;
  }
  audio {
    max-width: 100%;
    height: 3rem;
  }
`;
