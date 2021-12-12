import React from 'react';

import { storage } from '../../lib';
import { useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import setReaction from '../../utils/setReaction';
import setComment from '../../utils/setComment';

import { Container, Author, Text, Media, Reactions, Input, Comments } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faThumbsUp,
  faHeart,
  faLaugh,
  faSadCry,
  faAngry,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

import DefaultPicture from '../../assets/default-picture.png';

import { Post as PostType } from '../../global/types';

interface Props {
  post: PostType;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}

const Post: React.FC<Props> = ({ post, posts, setPosts }) => {
  const [value, setValue] = React.useState('');
  const [authorPicture, setAuthorPicture] = React.useState('');
  const user = useAppSelector(state => state.user.user);

  const getIcon = (docName: string) => {
    if (docName.match('.pdf')) return faFilePdf;
    else if (docName.match('.docx') || docName.match('dot')) return faFileWord;
    else if (docName.match('.pptx')) return faFilePowerpoint;
    else if (docName.match('.xlsx') || docName.match('.xlsm')) return faFileExcel;
    else return faFile;
  };

  const handleClick = (reaction?: string) => {
    if (user) {
      if (reaction) setReaction(user.id, post, posts, setPosts, reaction);
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

  const handleRender = (reaction: string): PostType['reactions'] => {
    const filteredReactions: PostType['reactions'] = [];
    post.reactions.forEach(reactionObj => {
      if (reactionObj.reaction === reaction) {
        filteredReactions.push(reactionObj);
      }
    });
    return filteredReactions;
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
        {post.media.images.length && (
          <ul className="mediaList">
            {post.media.images.map((img, i) => (
              <li key={`img${i}`}>
                <img src={img} alt={`img${i}`} />
              </li>
            ))}
          </ul>
        )}
        {post.media.videos.length && (
          <video controls>
            <source src={post.media.videos[0]} />
            Your browser doesn't support the video player!
          </video>
        )}
        {post.media.docs.length && (
          <ul className="mediaList">
            {post.media.docs.map((img, i) => (
              <li key={`doc${i}`}>
                <a download href={img.url} className="docView">
                  <FontAwesomeIcon icon={getIcon(img.name)} size="4x" />
                  {img.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Media>
      <Reactions>
        <li onClick={() => handleClick('like')}>
          <div>
            <FontAwesomeIcon color="blue" size="2x" icon={faThumbsUp} />
          </div>
          <div>
            <span>
              {(() => {
                const totalCorrespondingReactions = handleRender('like');
                return totalCorrespondingReactions.length;
              })()}
            </span>
          </div>
        </li>
        <li onClick={() => handleClick('heart')}>
          <div>
            <FontAwesomeIcon color="red" size="2x" icon={faHeart} />
          </div>
          <div>
            <span>
              {(() => {
                const totalCorrespondingReactions = handleRender('heart');
                return totalCorrespondingReactions.length;
              })()}
            </span>
          </div>
        </li>
        <li onClick={() => handleClick('smile')}>
          <div>
            <FontAwesomeIcon color="yellow" size="2x" icon={faLaugh} />
          </div>
          <div>
            <span>
              {(() => {
                const totalCorrespondingReactions = handleRender('smile');
                return totalCorrespondingReactions.length;
              })()}
            </span>
          </div>
        </li>
        <li onClick={() => handleClick('cry')}>
          <div>
            <FontAwesomeIcon color="yellow" size="2x" icon={faSadCry} />
          </div>
          <div>
            <span>
              {(() => {
                const totalCorrespondingReactions = handleRender('cry');
                return totalCorrespondingReactions.length;
              })()}
            </span>
          </div>
        </li>
        <li onClick={() => handleClick('angry')}>
          <div>
            <FontAwesomeIcon color="red" size="2x" icon={faAngry} />
          </div>
          <div>
            <span>
              {(() => {
                const totalCorrespondingReactions = handleRender('angry');
                return totalCorrespondingReactions.length;
              })()}
            </span>
          </div>
        </li>
      </Reactions>
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
          </li>
        ))}
      </Comments>
    </Container>
  );
};

export default Post;
