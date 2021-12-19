import React from 'react';

import { Container, DropdownButton, List, User, Message } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import DefaultPicture from '../../assets/default-picture.png';

import { Chat } from '../../global/types';

interface Props {
  chats: Chat[];
  setCurrentChat: (currentChat: string) => void;
  currentUserID: string;
}

const ChatsList: React.FC<Props> = ({ chats, setCurrentChat, currentUserID }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Chats list</span>
        <FontAwesomeIcon color="white" size="1x" icon={faArrowDown} />
      </DropdownButton>
      <List isDropdownOpen={isDropdownOpen}>
        {chats.map(chat => {
          if (chat.messages.length) {
            const l = chat.messages.length - 1;
            return (
              <li
                key={chat.id}
                onClick={() => setCurrentChat(chat.id)}
              >
                <User>
                  <img
                    src={
                      chat.messages[l].user.picture ? chat.messages[l].user.picture : DefaultPicture
                    }
                    alt={chat.messages[l].user.name}
                  />
                  <span>{chat.messages[l].user.name}</span>
                </User>
                <Message>
                  <span>{chat.messages[l].text}</span>
                  <div className="status">
                    <FontAwesomeIcon
                      color="purple"
                      size="1x"
                      icon={chat.messages[l].viewed ? faCheckCircle : faCheck}
                    />
                  </div>
                </Message>
              </li>
            );
          } else {
            const receiver = chat.users.find(user => user.id !== currentUserID);
            if (receiver) {
              return (
                <li key={chat.id} onClick={() => setCurrentChat(chat.id)}>
                  <User>
                    <img
                      src={receiver.picture ? receiver.picture : DefaultPicture}
                      alt={receiver.name}
                    />
                    <span>{receiver.name}</span>
                  </User>
                </li>
              );
            } else {
              const user = chat.users[0];
              return (
                <li key={chat.id} onClick={() => setCurrentChat(chat.id)}>
                  <User>
                    <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
                    <span>{user.name}</span>
                  </User>
                </li>
              );
            }
          }
        })}
      </List>
    </Container>
  );
};

export default ChatsList;
