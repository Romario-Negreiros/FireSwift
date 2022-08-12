import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: auto;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img,
  video {
    max-width: 100%;
    height: auto;
    max-height: 375px;
  }
`;