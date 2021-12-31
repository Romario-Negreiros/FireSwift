import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .title {
    width: 100%;
    h3 {
      text-align: center;
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.6rem;
      margin-bottom: 1rem;
    }
  }
  h4 {
    font-size: 1.5rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
  p {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.3rem;
  }
`;

export const Creator = styled.article`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin-top: 3rem;
  .creatorInfo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .content {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    .imgContainer {
      margin: auto;
      overflow: hidden;
      padding: 0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 10rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .txtContainer {
      text-align: center;
      width: 100%;
    }
  }
  @media screen and (min-width: 600px) {
    .content {
      justify-content: center;
      align-items: center;
      gap: 25rem;
      .imgContainer {
        margin: unset;
      }
      .txtContainer {
        text-align: unset;
        width: fit-content;
      }
    }
  }
`;

export const Admins = styled.ul`
  padding: 0 1rem;
  .admin {
    width: 100%;
    background: ${({ theme: { bgs } }) => bgs.tertiary};
    border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
  }
  @media screen and (min-width: 600px) {
    width: 450px;
    margin: auto;
    .admin {
      margin-bottom: 1rem;
      border-bottom: none;
    }
  }
  .sinceDate {
    display: none;
    @media screen and (min-width: 450px) {
      display: block;
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.2rem;
    }
  }
`;

export const Statistics = styled.ul`
  padding: 0 1rem;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  .statistics {
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
  }
  @media screen and (min-width: 600px) {
    width: 400px;
    margin: auto;
  }
`;
