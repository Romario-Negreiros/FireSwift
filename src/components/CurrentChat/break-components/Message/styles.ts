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
  margin-bottom: 3rem;
  div {
    word-break: break-all;
  }
  span {
    font-size: 1.4rem;
    word-wrap: wrap;
    color: ${({ theme: { fonts } }) => fonts.primary};
  }
  .status {
    position: absolute;
    bottom: 0.1rem;
    ${({ status }) => (status === 'owner' ? 'left: -2.4rem' : 'right: -2.4rem')};
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.5rem;
    }
    div.ballon {
      width: fit-content;
      background: transparent;
      transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
      border-radius: 5px;
      padding: .5rem;
      font-size: 1.2rem;
      position: absolute;
      word-break: normal;
      display: none;
      span {
        color: transparent;
      }
      @media screen and (min-width: 420px) {
        display: block;
        ${({ status }) => (status === 'owner' ? 'right: 2rem' : 'left: 2rem')}; 
        top: -1rem;
      }
    }
    :hover .ballon, :hover .ballon span {
      background: #333445;
      color: ${({ theme: { fonts } }) => fonts.primary};
    }
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
  bottom: -2rem;
  ${({ status }) => (status === 'owner' ? 'right: 0rem;' : 'left: 0rem;')};
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
