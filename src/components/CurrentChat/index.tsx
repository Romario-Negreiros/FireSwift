import React from 'react';

import { Container, Message, Input } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CurrentChat: React.FC = () => {
  const [value, setValue] = React.useState<string>('');

  return (
    <Container>
      <ul>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
          <Message key={Math.round(Math.random() * 551324)} status="sent">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur suscipit pariatur
              veritatis possimus magni vero harum provident architecto quis voluptas!
            </span>
            <div className="status">
              <FontAwesomeIcon color="white" icon={faCheck} />
              {/*
                  No icon > being sent
                  Icon no bg > sent not received
                  Icon and lighter bg > sent and received
                  Icon and darker bg > sent, received and read
                */}
            </div>
          </Message>
        ))}
      </ul>
      <Input>
        <input
          name="comment"
          placeholder="zzzzz"
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
