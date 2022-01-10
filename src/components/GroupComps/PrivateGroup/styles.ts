import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 100%;
  gap: 3rem;
  margin-top: 2rem;
`;

export const Title = styled.div`
  width: 100%;
  color: ${({ theme: { fonts }}) => fonts.secondary};
  text-align: center;
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1.4rem;
  }
`;

export const ChangeState = styled.button`
  border: 0 none;
  outline: 1px solid transparent;
  background: ${({theme: { gradients }}) => gradients.primary};
  padding: 1rem 2rem;
  color: ${({theme: { fonts }}) => fonts.secondary};
  width: 100%;
  max-width: 250px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;  
