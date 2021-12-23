import styled from 'styled-components';

export const TextField = styled.textarea`
  padding: 1rem;
  width: 100%;
  height: 15rem;
  resize: none;
  background: unset;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  color: ${({ theme: { fonts } }) => fonts.secondary};
`;

export const FileOptions = styled.ul`
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CustomLabelBox = styled.label`
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  border-radius: 50%;
  transition: filter ease-in-out 0.3s;
  :hover {
    filter: brightness(2);
  }
  :hover svg {
    transform: scale(1.1);
  }
`;
