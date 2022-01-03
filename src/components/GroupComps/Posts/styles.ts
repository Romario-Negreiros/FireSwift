import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  .list {
    border: 1px solid ${({ theme: { border } }) => border.primary};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 450px;
    gap: 1rem;
    h2 {
      width: fit-content !important;
    }
  }
`;
