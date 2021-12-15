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
  .tools {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
