import styled from 'styled-components';

export const Container = styled.section`
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 5px;
  width: 100%;
  ul:nth-child(1) {
    margin: auto;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
