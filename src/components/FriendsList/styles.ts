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