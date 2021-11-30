import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 5px;
  .innerList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    > li {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media screen and (min-width: 700px) {
        width: 50%;
      }
    }
  }
  .explore {
    width: 100%;
    display: flex;
    align-items: center;
    input {
      width: 90%;
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
      cursor: pointer;
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      :hover svg {
        transform: scale(1.1);
      }
    }
    @media screen and (min-width: 500px) {
      input {
        width: 94%;
      }
      div {
        width: 6%;
      }
    }
    @media screen and (min-width: 700px) {
      width: 50%;
    }
  }
  .tools {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }
`;
