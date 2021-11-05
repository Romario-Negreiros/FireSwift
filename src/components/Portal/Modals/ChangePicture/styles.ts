import styled from 'styled-components';

export const Input = styled.input`
    display: none;
`;

export const InputFileLabel = styled.label`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
    :hover {
        opacity: 0.5;
    }
`;