import styled from 'styled-components';

import { Message as Reusable } from '../ChatsList/styles';
import { Input as Reusable2 } from '../../global/styles';
import { Media as Reusable3 } from '../Post/styles';
import { FileOptions as Reusable4, CustomLabelBox as Reusable5 } from '../Create/Post/styles';

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
  div:not(.status) {
    word-break: break-all;
  }
  span {
    margin-right: 2rem;
    font-size: 1.4rem;
    word-wrap: wrap;
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
  position: relative;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  div {
    width: 10%;
  }
`;

export const Media = styled(Reusable3)`
  margin-right: -0.5rem;
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
`;

interface FileOptionsProps {
  optionsVisible: boolean;
}

export const FileOptions = styled(Reusable4)<FileOptionsProps>`
  position: absolute;
  z-index: 35;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  right: 0;
  flex-direction: row !important;
  transition: bottom 0.4s ease-in-out, visibility 0.4s ease-in-out;
  visibility: ${({ optionsVisible }) => (optionsVisible ? 'visible' : 'hidden')};
  bottom: ${({ optionsVisible }) => (optionsVisible ? '4rem' : '0rem')};
  overflow: unset !important;
  .ballon {
    display: none;
  }
  @media screen and (min-width: 450px) {
    width: fit-content;
  }
  @media screen and (min-width: 700px) {
    li {
      position: relative;
      .ballon {
        display: block;
        background: transparent;
        color: transparent;
        transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1.2rem;
        position: absolute;
        top: -3.5rem;
        left: -0.8rem;
        width: fit-content;
      }
      :hover .ballon {
        background: #333445;
        color: ${({ theme: { fonts } }) => fonts.primary};
      }
    }
  }
`;

export const CustomLabelBox = styled(Reusable5)``;
