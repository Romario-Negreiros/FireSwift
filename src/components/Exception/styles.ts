import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const Message = styled.p`
    text-align: center;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
`;