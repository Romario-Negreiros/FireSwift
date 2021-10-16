import styled from 'styled-components';

export const Container = styled.section``;

export const DropdownButton = styled.button`
  cursor: pointer;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  width: 100%;
  max-width: 80%;
  padding: 1rem 2rem;
  color: ${({ theme: { fonts } }) => fonts.primary};
  border: 0;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  :hover {
    opacity: 0.5;
  }
  :active {
    transform: skew(10deg);
  }
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

interface ListProps {
  isDropdownOpen: boolean;
}
export const List = styled.ul<ListProps>`
  position: relative;
  z-index: 30;
  width: 100%;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  overflow: auto;
  visibility: ${({ isDropdownOpen }) => (isDropdownOpen ? 'visible' : 'hidden')};
  max-height: ${({ isDropdownOpen }) => (isDropdownOpen ? '60vh' : '0vh')};
  transition: max-height 0.6s ease-in-out,
    visibility ${({ isDropdownOpen }) => (isDropdownOpen ? '.1s' : '.7s')} ease-in-out;
  border-radius: 5px;
  li {
    cursor: pointer;
    width: 100%;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
    :hover {
      backdrop-filter: brightness(1.2);
      -webkit-backdrop-filter: brightness(1.2);
    }
  }
  @media screen and (min-width: 700px) {
    position: unset;
    grid-column: 1 / 1;
    visibility: visible;
    max-height: 82.3vh;
    max-width: 400px;
  }
`;

export const User = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  span {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
    font-weight: bolder;
  }
`;

export const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  span {
    font-size: 1.2rem;
    opacity: 0.8;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
  .status {
    border-radius: 50%;
    border: 1px solid ${({ theme: { border } }) => border.primary};
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
