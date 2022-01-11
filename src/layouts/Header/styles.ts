import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.header`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme: { bgs } }) => bgs.primary};
  border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
  margin-bottom: 2rem;
  @media screen and (min-width: 300px) {
    padding: 2rem;
  }
  .sun {
    transform: translate(4px, 0px);
  }
  .moon {
    color: #d6d6c2;
    transform: translate(9px, 0px);
  }
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    h2 {
      color: ${({ theme: { fonts } }) => fonts.primary};
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
  .switch {
    position: fixed;
    z-index: 30;
  }
`;

interface ListProps {
  isMenuOpen: boolean;
}

export const List = styled.ul<ListProps>`
  position: absolute;
  top: calc(100vh - 75vh);
  z-index: 31;
  left: 0;
  height: 50vh;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  border-left: none;
  ${props => (props.isMenuOpen ? '' : 'border: none')};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  gap: 2rem;
  ${props => (props.isMenuOpen ? 'width: 5rem' : 'width: 0rem')};
  transition: width 0.5s ease-in-out;
  background: ${({ theme: { bgs } }) => bgs.primary};
  overflow: hidden;
  li {
    cursor: pointer;
    position: relative;
    .ballon {
      display: none;
    }
    svg {
      color: #ffffff;
      ${props => (props.isMenuOpen ? 'font-size: 1.6rem' : 'font-size: 0')}
    }
  }
  div {
    ${props => (props.isMenuOpen ? 'right: 0' : 'right: 30rem;')};
  }
  @media screen and (min-width: 700px) {
    overflow: unset;
    background: unset;
    position: unset;
    flex-direction: row;
    border: none;
    height: unset;
    width: unset;
    padding: unset;
    gap: 1rem;
    .noti {
      padding: 0 1rem;
      .ballon {
        right: -2.9rem;
      }
    }
    li {
      .ballon {
        display: block;
        background: transparent;
        color: transparent;
        transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1.2rem;
        position: absolute;
        bottom: -4rem;
        right: -0.6rem;
      }
      :hover .ballon {
        background: #333445;
        color: ${({ theme: { fonts } }) => fonts.primary};
      }
      :hover svg {
        opacity: 0.5;
      }
      svg {
        font-size: 1.6rem;
        path {
          width: 1rem;
        }
      }
    }
    div {
      right: 0;
    }
  }
`;

export const Burguer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

export const Line = styled.span`
  background: #ffffff;
  width: 15px;
  height: 2px;
  display: block;
  transition: all 0.4s ease-in-out;
  &.close-left {
    transform: translate(0, 7px) rotate(45deg);
  }
  &.close-right {
    transform: rotate(135deg);
  }
  &.fade {
    opacity: 0;
  }
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

export const Redirect = styled(Link)`
  padding: 1rem;
  cursor: pointer;
`;

export const User = styled.div`
  display: none !important;
  @media screen and (min-width: 350px) {
    display: flex !important;
    gap: 1rem;
    align-items: center;
    h2 {
      cursor: pointer;
      :hover {
        opacity: 0.5;
      }
    }
  }
`;
