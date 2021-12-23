import React from 'react';

import { Container, DropdownButton, List, User, Message } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import DefaultPicture from '../../assets/default-picture.png';

import { Chat, ChatUser, Medias } from '../../global/types';

interface Props {
  chats: Chat[];
  setCurrentChat: (currentChat: string) => void;
  currentUserID: string;
}

const ChatsList: React.FC<Props> = ({ chats, setCurrentChat, currentUserID }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  const displaySpanText = (media: Medias): string => {
    if(media.images) {
      return 'an image.'
    } else if (media.videos) {
      return 'a video.'
    } else if(media.docs) {
      return 'a file.'
    } else return 'a voice message.'
  };

  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Chats list</span>
        <FontAwesomeIcon color="white" size="1x" icon={faArrowDown} />
      </DropdownButton>
      <List isDropdownOpen={isDropdownOpen}>      
        {chats.map(chat => {
          const receiver: ChatUser | undefined = chat.users.find(user => user.id !== currentUserID);
          if (chat.messages.length) {
            const l = chat.messages.length - 1;
            const msg = chat.messages[l]
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
                  <Message>
                    {!msg.media ? (
                      <span>
                        {msg.user.id === receiver.id ? '' : 'You: '}
                        {msg.text}
                      </span>
                    ) : (
                      <span>
                        {msg.user.id === receiver.id ? receiver.name + ' sent ' + displaySpanText(msg.media) : 'You sent ' + displaySpanText(msg.media)}
                      </span>
                    )}
                  </Message>
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
                  <Message>
                    {!msg.media ? (
                      <span>
                        You: {msg.text}
                      </span>
                    ) : (
                      <span>
                      You sent {displaySpanText(msg.media)}
                    </span>
                    )}
                  </Message>
                </li>
              );
            }
          } else {
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
