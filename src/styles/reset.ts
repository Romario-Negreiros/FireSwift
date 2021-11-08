import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif;
        .Toastify__toast {
          background: linear-gradient(to right, #8e2de2, #4a00e0);
          color: #fff;
          font-size: 1.4rem;
        }
        .Toastify__progress-bar {
          background: ${({ theme: { bgs } }) => bgs.primary};
        }
    }
    svg {
        transition: transform ease-in-out 0.3s;
    }
    body {
        background: ${({ theme: { bgs } }) => bgs.secondary};
        position: relative;
        overflow-x: hidden;
    }
    html {
        font-size: 10px;
    }
    fieldset {
        border: 0 none;
    }
    ul {
        list-style: none;
    }
     a {
        text-decoration: none;
    }
    input:not(.checkbox), select {
      -webkit-appearance: none;
      -moz-appearance: none;
        border: 0 none;
        :focus {
            outline: 0;
        }
    }
    textarea {
      border: 0 none;
      :focus {
        outline: 0;
      }
    }
    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme: { bgs } }) => bgs.tertiary};
    }
    ::-webkit-scrollbar-thumb {
      background: #4a00e0;
    }
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
`;

export default Reset;
