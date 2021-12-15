import React from 'react';

import { Container, Message, Input } from './styles';
import { InnerCenteredContainer } from '../../global/styles';
import { Exception } from '..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Chat, User } from '../../global/types';

interface Props {
  userChats: Chat[];
  currentChatID: string;
  currentUser: User;
}

const CurrentChat: React.FC<Props> = ({ userChats, currentChatID, currentUser }) => {
  const [value, setValue] = React.useState<string>('');
  const [currentChatData, setCurrentChatData] = React.useState<Chat | null>(null);

  React.useEffect(() => {
    userChats.forEach(chat => {
      if (chat.chatID === currentChatID) setCurrentChatData(chat);
      else setCurrentChatData(null);
    });
  }, [currentChatID, userChats]);

  if (!currentChatData) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Exception message={'Choose a chat to start talking!'} />
        </InnerCenteredContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ul>
        {currentChatData.messages.map(msg => (
          <Message key={msg.id} status={msg.userID === currentUser.id ? 'owner' : ''}>
            <span>{msg.text}</span>
            <div className="status">
              <FontAwesomeIcon color="white" icon={faCheck} />
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
        />
        <div>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
    </Container>
  );
};

export default CurrentChat;
