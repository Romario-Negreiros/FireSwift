import React from 'react';

import { storage } from '../../lib';
import { useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import setPostReaction from '../../utils/setPostReaction';
import setComment from '../../utils/setComment';
import checkTime from '../../utils/checkTime';

import {
  Container,
  Author,
  Text,
  Media,
  PostReactions,
  Input,
  Comments,
  CommentReactions,
} from './styles';
import { Reactions, Contents } from './break-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DefaultPicture from '../../assets/default-picture.png';

import { Post as PostType } from '../../global/types';

interface Props {
  post: PostType;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}

const Post: React.FC<Props> = ({ post, posts, setPosts }) => {
  const [value, setValue] = React.useState('');
  const [willReply, setWillReply] = React.useState('');
  const [replyValue, setReplyValue] = React.useState('');
  const [authorPicture, setAuthorPicture] = React.useState('');
  const [showCommentReactions, setShowCommentReactions] = React.useState('');
  const user = useAppSelector(state => state.user.user);

  const handleClick = (reaction?: string) => {
    if (user) {
      if (reaction) setPostReaction(user.id, post, posts, setPosts, reaction);
      else {
        if (value) {
          setComment(user, post, posts, setPosts, value);
          setValue('');
        } else {
          toast.error('Comment cannot be empty!');
        }
      }
    } else {
      toast('You need to be logged in to complete this action!');
    }
  };

  React.useEffect(() => {
    (async () => {
      if (user && user.hasPicture) {
        const storageRef = storage.ref(storage.storage, `users${user.id}`);
        const authorPicture = await storage.getDownloadURL(storageRef);
        setAuthorPicture(authorPicture);
      }
    })();
  });

  return (
    <Container>
      <Author>
        <div>
          <img src={authorPicture ? authorPicture : DefaultPicture} alt={post.author} />
        </div>
        <h2>{post.author}</h2>
      </Author>
      <Text>
        <p>{post.content}</p>
      </Text>
      <Media>
        <Contents post={post} />
      </Media>
      <PostReactions>
        <Reactions reactions={post.reactions} handleClick={handleClick} />
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
            if (event.key === 'Enter') handleClick();
          }}
        />
        <div onClick={() => handleClick()}>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
      <Comments>
        {post.comments.map(comment => (
          <li key={comment.id}>
            <Author>
              <div>
                <img
                  src={comment.author.hasPicture ? comment.author.picture : DefaultPicture}
                  alt="fake pic"
                />
              </div>
              <h2>{comment.author.name}</h2>
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
                    if (event.key === 'Enter') handleClick();
                  }}
                />
                <div onClick={() => handleClick()}>
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
                  Like
                </span>
                <span>Replies({comment.replies.length})</span>
                <span
                  onClick={() =>
                    willReply === comment.id ? setWillReply('') : setWillReply(comment.id)
                  }
                >
                  Reply
                </span>
              </div>
              <span className="time">{checkTime(comment.time)}</span>
            </div>
            {showCommentReactions === comment.id ? (
              <CommentReactions>
                <Reactions reactions={comment.reactions} handleClick={handleClick} />
              </CommentReactions>
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
