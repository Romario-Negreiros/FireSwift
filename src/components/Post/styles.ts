import styled from 'styled-components';

export const Container = styled.li`
  position: relative;
  background: ${({ theme: { bgs } }) => bgs.tertiary};
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  div,
  ul {
    width: 100%;
  }
`;

export const Text = styled.div`
  padding: 0.5rem;
  p {
    font-size: 1.4rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
  }
`;

export const Media = styled.div`
  ul.mediaList {
    width: 100%;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(3, 1fr);
  }
  video {
    margin: 1rem 0;
    width: 100%;
    height: 200px;
  }
  .docView {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme: { fonts } }) => fonts.secondary};
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    :hover {
      transform: scale(1.1);
      opacity: 0.5;
    }
  }
  li {
    text-align: center;
    height: 100%;
  }
  img {
    width: fit-content;
    height: 100px;
  }
`;

export const PostReactions = styled.ul`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  li {
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    :nth-child(2) {
      margin-top: 0.5rem;
    }
  }
  span {
    color: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: 1.2rem;
  }
`;

export const Comments = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  max-height: 300px;
  overflow: auto;
  li {
    border-radius: 5px;
    border: 1px solid ${({ theme: { border } }) => border.primary};
    width: 100%;
    display: flex;
    flex-direction: column;
    div:nth-child(2) {
      padding: 1rem;
      color: ${({ theme: { fonts } }) => fonts.secondary};
    }
    p {
      font-size: 1.3rem;
    }
  }
  .bottomContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
      width: 70%;
    }
    span {
      display: inline-block;
      color: ${({ theme: { fonts } }) => fonts.secondary};
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
    }
    span:not(.time) {
      cursor: pointer;
      :hover {
        opacity: 0.5;
      }
    }
  }
`;

export const CommentReactions = styled(PostReactions)`
  margin-top: 0.5rem;
  background: ${({ theme: { bgs } }) => bgs.secondary};
  padding: 0;
  li {
    border: 0 none;
    margin-top: 1rem;
  }
  div {
    :nth-child(2) {
      margin-top: 0rem;
    }
  }
`;

export const Replies = styled(Comments)`
  li {
    background: ${({ theme: { bgs } }) => bgs.secondary};
  }
`;

export const ReplyReactions = styled(CommentReactions) `
  li {
    :hover {
      transform: none;
      opacity: 0.5;
    }
  }
`;