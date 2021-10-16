import React from 'react';

import { Container, Text, Image, Reactions, Input, Comments } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faThumbsUp,
  faHeart,
  faLaugh,
  faSadCry,
  faAngry,
} from '@fortawesome/free-solid-svg-icons';

import FakePost from '../../assets/mock-post.jpg';
import FakePicture from '../../assets/mock-profile.jpg';

const Post: React.FC = () => {
  const [value, setValue] = React.useState<string>('');

  return (
    <Container>
      <Text>
        <p>Some random text yeaaaaah yeeeevve neeeeev looooooov agaaaaaaaan</p>
      </Text>
      <Image>
        <img src={FakePost} alt="post" />
      </Image>
      <Reactions>
        <li>
          <FontAwesomeIcon color="blue" size="2x" icon={faThumbsUp} />
        </li>
        <li>
          <FontAwesomeIcon color="red" size="2x" icon={faHeart} />
        </li>
        <li>
          <FontAwesomeIcon color="yellow" size="2x" icon={faLaugh} />
        </li>
        <li>
          <FontAwesomeIcon color="yellow" size="2x" icon={faSadCry} />
        </li>
        <li>
          <FontAwesomeIcon color="red" size="2x" icon={faAngry} />
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
        <li>
          <div>
            <div>
              <img src={FakePicture} alt="fake pic" />
            </div>
            <h3>Author yooooo</h3>
          </div>
          <div>
            <p>Yoooooooooo Content aloooooot offffff</p>
          </div>
        </li>
        <li>
          <div>
            <div>
              <img src={FakePicture} alt="fake pic" />
            </div>
            <h3>Author yooooo</h3>
          </div>
          <div>
            <p>Yoooooooooo Content aloooooot offffff</p>
          </div>
        </li>
        <li>
          <div>
            <div>
              <img src={FakePicture} alt="fake pic" />
            </div>
            <h3>Author yooooo</h3>
          </div>
          <div>
            <p>Yoooooooooo Content aloooooot offffff</p>
          </div>
        </li>
        <li>
          <div>
            <div>
              <img src={FakePicture} alt="fake pic" />
            </div>
            <h3>Author yooooo</h3>
          </div>
          <div>
            <p>Yoooooooooo Content aloooooot offffff</p>
          </div>
        </li>
      </Comments>
    </Container>
  );
};

export default Post;
