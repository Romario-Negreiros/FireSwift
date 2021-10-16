import styled from 'styled-components';

export const Container = styled.section`
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 5px;
  width: 100%;
  overflow: auto;
  ul {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

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
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
  div {
    width: 100%;
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    img {
      width: 100%;
      object-fit: cover;
    }
    :nth-child(2) {
      height: 30%;
      padding: 0.5rem 0 0 0.5rem;
    }
    span {
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.4rem;
    }
  }
`;
