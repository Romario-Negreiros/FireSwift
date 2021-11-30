import styled from 'styled-components';

export const CenteredContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 81px);
  width: 100%;
`;

export const InnerCenteredContainer = styled(CenteredContainer)`
  height: 100%;
`;

export const FormBorder = styled.section`
  grid-column: span 2;
  width: 100%;
  max-width: 400px;
  background: ${({ theme: { gradients } }) => gradients.primary};
  padding: 0.5rem;
  @media screen and (min-width: 700px) {
    grid-column: 1;
  }
`;

export const Form = styled.form`
  position: relative;
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
  .checkboxWrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .checkbox {
    -webkit-appearance: none;
    background-color: ${({ theme: { bgs } }) => bgs.tertiary};
    padding: 5px;
    border-radius: 50%;
    border: 1px solid ${({ theme: { border } }) => border.secondary};
    cursor: pointer;
    :hover {
      background: ${({ theme: { gradients } }) => gradients.primary};
    }
  }
  .checkbox:checked {
    background: ${({ theme: { gradients } }) => gradients.primary};
  }
  label {
    cursor: pointer;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
  }
  input:not(.checkbox),
  select {
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
  div:not(.checkboxWrapper) {
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
    background: ${({ theme: { gradients } }) => gradients.primary};
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

export const ErrorBorder = styled.section`
  background: ${({ theme: { gradients } }) => gradients.secondary};
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  grid-column: span 2;
  @media screen and (min-width: 700px) {
    grid-column: 1 / 1;
  }
`;

export const ErrorMessage = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  p {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
  }
`;

export const ModalBG = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 40;
`;

export const CloseModal = styled.div`
  position: absolute;
  width: 20px !important;
  height: 20px;
  right: -30px;
  top: -30px;
  svg {
    cursor: pointer;
  }
`;

export const CreationContainer = styled.section`
  width: 100%;
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomIconBox = styled.li`
  cursor: pointer;
  padding: 1rem;
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
