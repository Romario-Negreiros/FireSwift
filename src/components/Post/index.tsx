import React from 'react';

import { storage } from '../../lib';

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
}

const Post: React.FC<Props> = ({ post }) => {
  const [value, setValue] = React.useState('');
  const [authorPicture, setAuthorPicture] = React.useState('');

  const getIcon = (docName: string) => {
    if(docName.match('.pdf')) return faFilePdf
    else if(docName.match('.docx') || docName.match('dot')) return faFileWord
    else if(docName.match('.pptx')) return faFilePowerpoint
    else if(docName.match('.xlsx') || docName.match('.xlsm')) return faFileExcel
    else return faFile
  }

  React.useEffect(() => {
    (async () => {
      const storageRef = storage.ref(storage.storage, `users/${post.authorID}`);
      const authorPictureURL = await storage.getDownloadURL(storageRef);
      setAuthorPicture(authorPictureURL);
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
        <li>
          <div>
            <FontAwesomeIcon color="blue" size="2x" icon={faThumbsUp} />
          </div>
          <div>
            <span>{post.reactions.like.length}</span>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon color="red" size="2x" icon={faHeart} />
          </div>
          <div>
            <span>{post.reactions.heart.length}</span>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon color="yellow" size="2x" icon={faLaugh} />
          </div>
          <div>
            <span>{post.reactions.smile.length}</span>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon color="yellow" size="2x" icon={faSadCry} />
          </div>
          <div>
            <span>{post.reactions.cry.length}</span>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon color="red" size="2x" icon={faAngry} />
          </div>
          <div>
            <span>{post.reactions.heart.length}</span>
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
        />
        <div>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
      <Comments>
        {post.comments.map(comment => (
          <li key={comment.authorID}>
            <div>
              <div>
                <img src={DefaultPicture} alt="fake pic" />
              </div>
              <h2>{comment.author}</h2>
            </div>
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
