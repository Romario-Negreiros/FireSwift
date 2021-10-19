import styled from 'styled-components';

export const CenteredContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 81px);
    width: 100%;
`;

export const InnerCenteredContainer = styled(CenteredContainer)`
  height: 100%;
`;
