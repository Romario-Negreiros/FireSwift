import styled from 'styled-components';

export const Profile = styled.li`
  width: 150px;
  height: 100%;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  overflow: hidden;
  transition: opacity 0.5s ease-in-out;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  div {
    width: 100%;
    img {
      :hover {
        cursor: pointer;
        opacity: 0.5;
      }
      width: 100%;
      object-fit: cover;
    }
    :nth-child(2) {
      height: 30%;
      padding: 0.5rem 0 0 0.5rem;
    }
    span {
      :hover {
        cursor: pointer;
        opacity: 0.5;
      }
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.4rem;
    }
  }
  button {
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
    border: 0 none;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
    :hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
`;
