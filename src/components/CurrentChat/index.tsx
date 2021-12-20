import React from 'react';

import setMessage from '../../utils/setters/setMessage';

import { Container, Message, Input } from './styles';
import { CenteredContainer } from '../../global/styles';
import { Exception } from '..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Chat, User } from '../../global/types';

interface Props {
  currentChat: string;
  chats: Chat[];
  currentUser: User;
}

const CurrentChat: React.FC<Props> = ({ currentChat, chats, currentUser }) => {
  const [value, setValue] = React.useState('');
  const [chat, setChat] = React.useState<Chat | null>(null);

  React.useEffect(() => {
    if (currentChat) {
      chats.forEach(chat => {
        if (chat.id === currentChat) setChat(chat);
      });
    }
}, [chats, currentChat]);

  if (!chat) {
    return (
      <CenteredContainer>
        <Exception message={'You have no chat opened!'} />
      </CenteredContainer>
    );
  }
  return (
    <Container>
      <ul>
        {chat.messages.map(msg => (
          <Message key={msg.id} status={msg.user.id === currentUser.id ? 'owner' : ''}>
            <span>{msg.text}</span>
            <div className="status">
              <FontAwesomeIcon color="white" icon={msg.viewed ? faCheckCircle : faCheck} />
            </div>
          </Message>
        ))}
      </ul>
      <Input>
        <input
          name="comment"
          placeholder="Aa"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
          onKeyPress={event => {
            if (event.key === 'Enter') setMessage(chat, currentUser, value, setValue);
          }}
        />
        <div onClick={() => setMessage(chat, currentUser, value, setValue)}>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
    </Container>
  );
};

export default CurrentChat;
