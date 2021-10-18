import styled from 'styled-components';

import { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(1turn)
    }
`;

export const LoaderSpin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ::after {
        content: '';
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        border: 10px solid #c1d5e4;
        border-top: 10px solid #8e2de2;
        animation: ${spin} 1s linear infinite;
    }
`;