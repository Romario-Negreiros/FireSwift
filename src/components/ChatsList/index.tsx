import React from 'react';

import { Container, DropdownButton, List, User, Message } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';

import DefaultPicture from '../../assets/default-picture.png';

import { Chat, User as UserType } from '../../global/types';

interface Props {
  userChats: Chat[];
  setCurrentChatID: (currentChatID: string) => void;
  currentUser: UserType;
}
const ChatsList: React.FC<Props> = ({ userChats, setCurrentChatID, currentUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Chats list</span>
        <FontAwesomeIcon color="white" size="1x" icon={faArrowDown} />
      </DropdownButton>
      <List isDropdownOpen={isDropdownOpen}>
        {userChats.map(chat => (
          <li key={chat.chatID} onClick={() => setCurrentChatID(chat.chatID)}>
            {chat.messages.length ? (
              chat.users.filter(user => {
                if (user.id === chat.messages[chat.messages.length - 1].userID) {
                  return (
                    <>
                      <User>
                        <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
                        <span>{user.name}</span>
                      </User>
                      <Message>
                        <span>{chat.messages[chat.messages.length - 1].text}</span>
                        <div className="status">
                          <FontAwesomeIcon color="purple" icon={faCheck} />
                        </div>
                      </Message>
                    </>
                  );
                } else return null;
              })
            ) : chat.users[0].id === chat.users[1].id ? (
              <>
                <User>
                  <img
                    src={chat.users[0].picture ? chat.users[0].picture : DefaultPicture}
                    alt={chat.users[0].name}
                  />
                  <span>{chat.users[0].name}</span>
                </User>
                <Message>
                  <span>No messages have been sent yet</span>
                </Message>
              </>
            ) : (
              chat.users.filter(user => {
                if (user.id !== currentUser.id) {
                  return (
                    <>
                      <User>
                        <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
                        <span>{user.name}</span>
                      </User>
                      <Message>
                        <span>No messages have been sent yet</span>
                      </Message>
                    </>
                  );
                } else return null;
              })
            )}
          </li>
        ))}
      </List>
    </Container>
  );
};

export default ChatsList;
