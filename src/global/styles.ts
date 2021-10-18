import styled from 'styled-components';

export const Exception = styled.section`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
  }
`;

export const CenteredContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 61px);
    width: 100%;
`;

export const InnerCenteredContainer = styled(CenteredContainer)`
  height: 100%;
`;
