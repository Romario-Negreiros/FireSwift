import styled from 'styled-components';

import { Input as Reusable1 } from '../../global/styles';
import { FileOptions as Reusable2, CustomLabelBox as Reusable3 } from '../Create/Post/styles';

export const Container = styled.section`
  width: 100%;
  max-height: 100%;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul:not(.options) {
    display: flex;
    flex-direction: column;
    max-height: 75.5vh;
    overflow: auto;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

export const Input = styled(Reusable1)`
  position: relative;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  div {
    width: 10%;
  }
`;

interface FileOptionsProps {
  optionsVisible: boolean;
}

export const FileOptions = styled(Reusable2)<FileOptionsProps>`
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
        left: -0.2rem;
        width: fit-content;
      }
      :hover .ballon {
        background: #333445;
        color: ${({ theme: { fonts } }) => fonts.primary};
      }
    }
  }
`;

export const CustomLabelBox = styled(Reusable3)``;

export const ResponseView = styled.div`
  padding: 1rem;
  position: absolute;
  left: 0;
  top: -6rem;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  border: 1px solid ${({ theme: { border } }) => border.secondary};
  color: ${({ theme: { fonts } }) => fonts.secondary};
  border-bottom: none;
  border-left: none;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 5rem;
  width: 100% !important;
  height: 6rem;
  :hover {
    cursor: default !important;
    transform: none !important;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  p {
    font-size: 1.4rem;
  }
  div.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: default;
    transform: none;
  }
  .close {
    width: fit-content;
    margin-right: 3rem;
  }
`;
