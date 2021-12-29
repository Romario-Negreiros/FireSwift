import styled from 'styled-components';

export const Container = styled.main`
  margin-top: -1.5rem;
`;

export const Presentation = styled.ul`
  width: 100%;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
  li {
    width: 100%;
    text-align: center;
  }
  .bgImg {
    height: 250px;
    padding: 0 1rem;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }
    @media screen and (min-width: 750px) {
      height: 300px;
      padding: 0;
      img {
        width: 650px;
      }
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    :after {
      display: block;
      content: '';
      background: ${({ theme: { gradients } }) => gradients.primary};
      opacity: 0.8;
      height: 2px;
      width: 50%;
      margin: auto;
    }
    h1 {
      display: inline-block;
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 2rem;
      margin-bottom: 1rem;
      padding: 0 1.5rem;
    }
    p {
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.3rem;
      margin: auto;
      margin-bottom: 1rem;
      padding: 0 1.5rem;
    }
    @media screen and (min-width: 750px) {
      h1 {
        font-size: 2.2rem;
      }
      p {
        max-width: 650px;
        font-size: 1.5rem;
      }
    }
  }
  .options {
    ul {
      display: flex;
      width: 100%;
      margin: auto;
      li {
        color: ${({theme: { fonts }}) => fonts.secondary};
        font-size: 1.4rem;
        padding: 1rem 2rem;
        cursor: pointer;
        :hover {
          backdrop-filter: brightness(135%);
        }
      }
      @media screen and (min-width: 400px) {
        width: 350px;
      }
    }
  }
`;
