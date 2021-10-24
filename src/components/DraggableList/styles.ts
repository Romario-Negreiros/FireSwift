import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  color: ${({theme: { fonts }}) => fonts.secondary};
  ul {
    overflow: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({theme: { border }}) => border.primary};
    background: ${({theme: { bgs }}) => bgs.secondary};
    width: 48%;
    max-height: 200px;
  }
  li {
    width: 100%;
    border-bottom: 1px solid ${({theme: { border }}) => border.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    :hover {
      backdrop-filter: brightness(1.2);
      -webkit-backdrop-filter: brightness(1.2);
    }
  }
  span {
    font-size: 1.2rem;
  }
  img {
    width: 20px;
    object-fit: cover;
  }
  h1 {
    width: 100%;
    font-size: 1.8rem;
    text-align: center;
  }
`;
