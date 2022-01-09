import styled from 'styled-components';

import { User as Reusable } from '../ManageUsers/styles';

export const User = styled(Reusable)`
  div.upDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    width: 100%;
    h2 {
      margin-top: 1rem;
    }
  }
  align-items: flex-start;
  flex-flow: column;
  gap: 0.5rem;
`;
