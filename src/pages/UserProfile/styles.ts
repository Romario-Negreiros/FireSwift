import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
  z-index: 5;
  margin: auto;
  width: 100%;
  max-width: 1000px;
  border-radius: 5px;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Manage = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  color: ${({ theme: { fonts } }) => fonts.secondary};
  background: unset;
  border: 0 none;
  cursor: pointer;
  @media screen and (min-width: 400px) {
    flex-direction: row;
    gap: 0.5rem;
  }
  :hover {
    opacity: 0.5;
  }
`;

export const Picture = styled.div`
  margin: -2rem 0 0;
  width: 100%;
  text-align: center;
  overflow: hidden;
  img {
    border-radius: 50%;
    border: 1px solid ${({ theme: { border } }) => border.primary};
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }
  h1 {
    font-size: 2.2rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
`;

export const UserBio = styled.div`
  width: 100%;
  color: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: 1.4rem;
  text-align: center;
  margin: 2rem auto;
`;

export const UserInfo = styled.ul`
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  li {
    padding: 1rem;
    border-radius: 5px;
    width: 100%;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    @media screen and (min-width: 500px) {
      width: 48%;
    }
    @media screen and (min-width: 900px) {
      width: 30%;
    }
  }
  .languages,
  .hobbies {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    h2 {
      width: 100%;
    }
    div {
      margin-top: 0.5rem;
      width: fit-content;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 5px;
      background: ${({ theme: { bgs } }) => bgs.secondary};
    }
    span {
      display: inline;
      margin: 0;
    }
    img {
      width: 2.5rem;
      object-fit: cover;
    }
  }
  h2 {
    font-size: 1.6rem;
  }
  span {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const Friends = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  margin-top: 1rem;
  h2 {
    margin-bottom: 1rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.8rem;
  }
`;

export const AccountOptions = styled.ul`
  .title {
    margin: 0;
    background: unset;
    text-align: center;
    border: 0;
    transition: unset;
    cursor: auto;
    :hover {
      transform: unset;
      opacity: unset;
    }
    @media screen and (min-width: 700px) {
      max-width: 100%;
    }
  }
  h2 {
    margin-bottom: 1rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.8rem;
  }
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  @media screen and (min-width: 700px) {
    padding: 0;
  }
  li {
    width: 100%;
    padding: 2rem;
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    border-radius: 5px;
    margin: 1rem 0;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
    :hover {
      opacity: 0.5;
      transform: scale(1.01);
    }
    @media screen and (min-width: 700px) {
      max-width: calc(100% / 2 - 2rem);
      margin: 1rem;
    }
  }
  span {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.4rem;
  }
`;
