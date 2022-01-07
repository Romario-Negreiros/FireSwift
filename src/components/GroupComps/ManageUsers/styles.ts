import styled from 'styled-components';

export const User = styled.li`
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;