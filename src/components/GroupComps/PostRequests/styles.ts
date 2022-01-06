import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Options = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  button {
    color: ${({ theme: { fonts } }) => fonts.primary};
    padding: 1rem 3rem;
    border-radius: 5px;
    border: none;
    border: 0px solid ${({ theme: { border } }) => border.secondary};
    outline: 0 none;
    transition: opacity 0.3s ease-in-out, border-width 0.1s ease-in-out;
    :hover {
      opacity: 0.5;
    }
    :active {
      border-width: 2px;
    }
    cursor: pointer;
  }
  .refuse {
    background: ${({ theme: { gradients } }) => gradients.secondary};
  }
  .accept {
    background: ${({ theme: { gradients } }) => gradients.primary};
  }
`;
