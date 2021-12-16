import React from 'react';

import { Container, Message, Input } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CurrentChat: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <Container>
      <ul>
        <Message status="owner">
          <span>msg.text</span>
          <div className="status">
            <FontAwesomeIcon color="white" icon={faCheck} />
          </div>
        </Message>
      </ul>
      <Input>
        <input
          name="comment"
          placeholder="Aa"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
        />
        <div>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
    </Container>
  );
};

export default CurrentChat;
