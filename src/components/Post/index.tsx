import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import setPostReaction from '../../utils/setters/setPostReaction';
import setCommentReaction from '../../utils/setters/setCommentReaction';
import setComment from '../../utils/setters/setComment';
import setReply from '../../utils/setters/setReply';
import setReplyReaction from '../../utils/setters/setReplyReaction';
import checkTime from '../../utils/general/checkTime';

import {
  Container,
  Text,
  Media,
  PostReactions,
  Comments,
  CommentReactions,
  Replies,
  ReplyReactions,
} from './styles';
import { Input, Author } from '../../global/styles';
import { Reactions } from './break-components';
import { Contents } from '..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DefaultPicture from '../../assets/default-picture.png';

import { Post as PostType } from '../../global/types';

interface Props {
  post: PostType;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  pathSegment: string;
  statePost?: {
    id: string;
    pathSegment: string;
    commentID?: string;
    replyID?: string;
  };
}

const Post: React.FC<Props> = ({ post, posts, setPosts, pathSegment, statePost }) => {
  const [value, setValue] = React.useState('');
  const [willReply, setWillReply] = React.useState('');
  const [replyValue, setReplyValue] = React.useState('');
  const [showCommentReactions, setShowCommentReactions] = React.useState('');
  const [showRepliesList, setShowRepliesList] = React.useState('');
  const [showReplyReactions, setShowReplyReactions] = React.useState('');
  const user = useAppSelector(state => state.user.user);

  const setShowReplies = React.useCallback(
    (id: string) => {
      showRepliesList === id ? setShowRepliesList('') : setShowRepliesList(id);
    },
    [showRepliesList]
  );

  const handleClick = (reaction?: string, type?: string, commentID?: string) => {
    if (user) {
      if (reaction) {
        if (type === 'COMMENT_REACTIONS') {
          setCommentReaction(
            user,
            showCommentReactions,
            post,
            posts,
            setPosts,
            reaction,
            pathSegment
          );
        } else if (type === 'POST_REACTIONS')
          setPostReaction(user, post, posts, setPosts, reaction, pathSegment);
        else if (type === 'REPLY_REACTIONS' && commentID)
          setReplyReaction(
            user,
            commentID,
            showReplyReactions,
            post,
            posts,
            setPosts,
            reaction,
            pathSegment
          );
      } else {
        if (type === 'NEW_COMMENT') {
          if (value) {
            setComment(user, post, posts, setPosts, value, pathSegment);
            setValue('');
          } else {
            toast.error('Comment cannot be empty!');
          }
        } else if (type === 'NEW_REPLY') {
          if (replyValue) {
            setReply(willReply, user, post, posts, setPosts, replyValue, pathSegment);
            setReplyValue('');
            setWillReply('');
          } else {
            toast.error('Reply cannot be empty!');
          }
        }
      }
    } else {
      toast.error('You need to be logged in to complete this action!');
    }
  };

  React.useEffect(() => {
    if (statePost) {
      const post = document.getElementById(statePost.id) as HTMLLIElement;
      window.scrollTo({
        top: window.innerHeight - post.offsetTop + 40,
        behavior: 'smooth',
      });
      if (statePost.commentID) {
        const commentsList = document.getElementById(statePost.commentID) as HTMLUListElement;
        const comment = document.getElementById(`comment${statePost.commentID}`) as HTMLLIElement;
        commentsList.scrollTo({
          top: comment.offsetTop - commentsList.offsetTop,
          behavior: 'smooth',
        });
        if (statePost.commentID && statePost.replyID) {
          if (showRepliesList) {
            const repliesList = document.getElementById(statePost.replyID) as HTMLUListElement;
            const reply = document.getElementById(`reply${statePost.replyID}`) as HTMLLIElement;
            // commentsList.scrollTo({
            //   top: reply.offsetTop,
            //   behavior: 'smooth',
            // });
            const post = posts.find(post => post.id === statePost.id);
            const comment = post?.comments.find(comment => comment.id === statePost.commentID);
            const replyIndex = comment?.replies.findIndex(reply => reply.id === statePost.replyID);
            if (replyIndex) {
              repliesList.scrollTo({
                top: reply.offsetHeight * replyIndex,
                behavior: 'smooth',
              });
            }
          } else setShowReplies(statePost.commentID);
        }
      }
    }
  }, [setShowReplies, showRepliesList, statePost]);

  return (
    <Container id={statePost ? statePost.id : ''}>
      <Author>
        <div>
          <img
            src={post.author.picture ? post.author.picture : DefaultPicture}
            alt={post.author.name}
          />
        </div>
        <div className="name">
          <h2>{post.author.name}</h2>
        </div>
      </Author>
      <Text>
        <p>{post.content}</p>
      </Text>
      <Media>
        <Contents item={post} />
      </Media>
      <PostReactions>
        <Reactions reactions={post.reactions} handleClick={handleClick} type="POST_REACTIONS" />
      </PostReactions>
      <Input>
        <input
          name="comment"
          placeholder="Leave a comment!"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') handleClick(undefined, 'NEW_COMMENT');
          }}
        />
        <div onClick={() => handleClick(undefined, 'NEW_COMMENT')}>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
      <Comments id={statePost && statePost.commentID ? statePost.commentID : ''}>
        {post.comments.map(comment => (
          <li key={comment.id} id={`comment${comment.id}`}>
            <Author>
              <div>
                <img
                  src={comment.author.picture ? comment.author.picture : DefaultPicture}
                  alt="fake pic"
                />
              </div>
              <div className="name">
                <h2>{comment.author.name}</h2>
              </div>
            </Author>
            <div>
              <p>{comment.content}</p>
            </div>
            {willReply === comment.id ? (
              <Input>
                <input
                  name="reply"
                  placeholder="Leave a reply!"
                  value={replyValue}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    setReplyValue(event.currentTarget.value)
                  }
                  onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Enter') handleClick(undefined, 'NEW_REPLY');
                  }}
                />
                <div onClick={() => handleClick(undefined, 'NEW_REPLY')}>
                  <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
                </div>
              </Input>
            ) : (
              ''
            )}
            <div className="bottomContent">
              <div>
                <span
                  onClick={() =>
                    showCommentReactions === comment.id
                      ? setShowCommentReactions('')
                      : setShowCommentReactions(comment.id)
                  }
                >
                  React
                </span>
                <span onClick={() => setShowReplies(comment.id)}>
                  Replies({comment.replies.length})
                </span>
                <span
                  onClick={() => {
                    if (willReply === comment.id) {
                      setWillReply('');
                    } else {
                      setWillReply(comment.id);
                    }
                  }}
                >
                  Reply
                </span>
              </div>
              <span className="time">{checkTime(comment.formattedDate)}</span>
            </div>
            {showCommentReactions === comment.id ? (
              <CommentReactions>
                <Reactions
                  reactions={comment.reactions}
                  handleClick={handleClick}
                  type="COMMENT_REACTIONS"
                />
              </CommentReactions>
            ) : (
              ''
            )}
            {showRepliesList === comment.id ? (
              <Replies id={statePost && statePost.replyID ? statePost.replyID : ''}>
                {comment.replies.map((reply, i) => (
                  <li
                    key={reply.id}
                    id={statePost && statePost.replyID ? `reply${statePost.replyID}` : ''}
                  >
                    <Author>
                      <div>
                        <img
                          src={reply.author.picture ? reply.author.picture : DefaultPicture}
                          alt="fake pic"
                        />
                      </div>
                      <h2>{reply.author.name}</h2>
                    </Author>
                    <div>
                      <p>{reply.content}</p>
                    </div>
                    <div className="bottomContent">
                      <div>
                        <span
                          onClick={() =>
                            showReplyReactions === reply.id
                              ? setShowReplyReactions('')
                              : setShowReplyReactions(reply.id)
                          }
                        >
                          React
                        </span>
                      </div>
                      <span className="time">{checkTime(reply.formattedDate)}</span>
                    </div>
                    {showReplyReactions === reply.id ? (
                      <ReplyReactions>
                        <Reactions
                          reactions={reply.reactions}
                          handleClick={handleClick}
                          commentID={comment.id}
                          type="REPLY_REACTIONS"
                        />
                      </ReplyReactions>
                    ) : (
                      ''
                    )}
                  </li>
                ))}
              </Replies>
            ) : (
              ''
            )}
          </li>
        ))}
      </Comments>
    </Container>
  );
};

export default Post;
