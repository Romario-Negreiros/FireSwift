import styled from 'styled-components';

export const Container = styled.li`
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  div,
  ul {
    width: 100%;
  }
`;

export const Text = styled.div`
  padding: 1rem;
  p {
    font-size: 1.4rem;
    text-indent: 0.5rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
`;

export const Image = styled.div`
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const Reactions = styled.ul`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  li {
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
  }
`;

export const Input = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
  border-top: 1px solid ${({ theme: { border } }) => border.primary};
  display: flex;
  align-items: center;
  input {
    width: 80%;
    background: unset;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    padding: 0.2rem;
    border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
    :hover,
    :focus {
      border-color: ${({ theme: { border } }) => border.secondary};
    }
  }
  div {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
  }
`;

export const Comments = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  max-height: 300px;
  overflow: auto;
  li {
    border-radius: 5px;
    border: 1px solid ${({ theme: { border } }) => border.primary};
    width: 100%;
    display: flex;
    flex-direction: column;
    :hover {
      backdrop-filter: brightness(1.2);
      -webkit-backdrop-filter: brightness(1.2);
    }
    div:nth-child(1) {
      display: flex;
      gap: 0.8rem;
      align-items: center;
      div {
        overflow: hidden;
        padding: 0;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    div {
      padding: 1rem;
      color: ${({ theme: { fonts } }) => fonts.secondary};
    }
    p {
      font-size: 1.2rem;
    }
  }
`;
