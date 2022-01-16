import styled from 'styled-components';

export const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: auto;
  width: 100vw;
  z-index: 50;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  @media screen and (min-width: 500px) {
    position: absolute;
    height: fit-content;
    max-height: 450px;
    max-width: 400px;
    left: unset;
    top: 80px;
    right: 0;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Notification = styled.li`
  padding: 0.5rem;
  color: ${({ theme: { fonts } }) => fonts.secondary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  cursor: pointer;
  :hover {
    backdrop-filter: brightness(115%);
  }
  p {
    font-size: 1.4rem;
  }
  .delete {
    position: absolute;
    top: 5px;
    right: 20px;
    :hover {
      transform: scale(1.2);
    }
  }
`;

export const CloseNotis = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  cursor: pointer;
`;
