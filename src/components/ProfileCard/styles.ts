import styled from 'styled-components';

interface StyledProps {
  state?: string;
}

export const Profile = styled.li<StyledProps>`
  width: 130px;
  height: 100%;
  margin-right: 0.5rem;
  display: grid;
  grid-template-rows: 60% 25% 25%;
  border-radius: 5px;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  overflow: hidden;
  transition: opacity 0.5s ease-in-out;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  div {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      :hover {
        opacity: 0.5;
      }
    }
    :nth-child(2) {
      padding: 0.5rem 0 0 0.5rem;
    }
    span {
      color: ${({theme: { fonts }}) => fonts.secondary};
      font-size: 1.2rem;
      cursor: pointer;
      :hover {
        opacity: 0.5;
      }
    }
  }
  button {
    background: ${props =>
      props.state === 'remove'
        ? 'linear-gradient(to right, #ed213a, #93291e)'
        :  'linear-gradient(to right, #8e2de2, #4a00e0)'};
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    border: 0 none;
    color: ${({ theme: { fonts } }) => fonts.primary};
    font-size: 1.4rem;
    :hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
`;
