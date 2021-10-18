import styled from 'styled-components';

export const Exception = styled.main`
  padding: 1rem;
  width: 100vw;
  height: calc(100vh - 61px);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
  }
`;
