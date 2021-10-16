import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: calc(100vh - 111px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  padding: 3rem;
`;

export const FormBorder = styled.section`
  grid-column: span 2;
  width: 100%;
  max-width: 400px;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  padding: 0.5rem;
  @media screen and (min-width: 700px) {
    grid-column: 1;
  }
`;
export const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 2rem;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 300px;
    img {
      width: 10rem;
      height: 10rem;
    }
    h1 {
      font-size: 2rem;
      color: ${({ theme: { fonts } }) => fonts.secondary};
    }
  }
  p {
    width: 100%;
    max-width: 300px;
    color: #ff0000;
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }
  input {
    width: 100%;
    max-width: 300px;
    background: unset;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    padding: 0.2rem;
    border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
    :hover,
    :focus {
      border-color: ${({ theme: { border } }) => border.secondary};
    }
  }
  div {
    width: 100%;
    max-width: 300px;
    display: flex;
    input {
      width: 80%;
    }
    div {
      cursor: pointer;
      width: 20%;
      justify-content: center;
      align-items: center;
      :hover {
        transform: scale(1.1);
      }
    }
  }
  button {
    cursor: pointer;
    margin-top: 2rem;
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    width: 100%;
    max-width: 300px;
    padding: 1rem 2rem;
    color: ${({ theme: { fonts } }) => fonts.primary};
    border: 0;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    :hover {
      opacity: 0.5;
    }
    :active {
      transform: skew(10deg);
    }
  }
  .redirect {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.2rem;
    cursor: pointer;
    :hover {
      text-decoration: underline #fff;
    }
  }
  @media screen and (min-width: 700px) {
    .redirect {
      display: none;
    }
    .redirect-appear {
      display: inline;
    }
  }
`;

export const CreateAccount = styled.section`
  width: 100%;
  max-width: 400px;
  grid-column: 2;
  display: none;
  div {
    width: 100%;
  }
  h1 {
    width: 100%;
    font-size: 6rem;
    background-image: linear-gradient(to right, #8e2de2, #4a00e0);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-indent: 6rem;
    @media screen and (min-width: 900px) {
      text-indent: 0;
      font-size: 8rem;
    }
  }
  h1:nth-child(2) {
    text-indent: 8rem;
    @media screen and (min-width: 900px) {
      text-indent: 3rem;
    }
  }
  @media screen and (min-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover h1 {
      opacity: 0.5;
    }
  }
`;

export const ErrorBorder = styled.div`
  background: linear-gradient(to right, #ed213a, #93291e);
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  grid-column: span 2;
  @media screen and (min-width: 700px) {
    grid-column: 1 / 1;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: ${({theme: { bgs }}) => bgs.secondary};
  p { 
    color: ${({theme: { fonts }}) => fonts.secondary};
    font-size: 1.4rem;
  }
`;
