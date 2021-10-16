import styled from 'styled-components';

import { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(1turn)
    }
`;

export const CenteredContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 111px);
    width: 100vw;
`;

export const LoaderSpin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ::after {
        content: '';
        width: 25vw;
        height: 25vw;
        border-radius: 50%;
        border: 10px solid #c1d5e4;
        border-top: 10px solid #8e2de2;
        animation: ${spin} 1s linear infinite;
    }
`;