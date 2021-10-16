import styled from 'styled-components';

export const Container = styled.section`
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 5px;
  width: 100%;
  max-width: 500px;
  ul:nth-child(1) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;
