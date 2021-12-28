import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import deleteChat from '../../utils/general/deleteChat';

import { Container, DropdownButton, List, User, Message } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheckCircle, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

import DefaultPicture from '../../assets/default-picture.png';

import { Chat, User as UserType, ChatUser, Medias } from '../../global/types';

interface Props {
  chats: Chat[];
  setCurrentChat: (currentChat: string) => void;
  currentUser: UserType;
}

const ChatsList: React.FC<Props> = ({ chats, setCurrentChat, currentUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const displaySpanText = (media: Medias): string => {
    if (media.images) {
      return 'an image.';
    } else if (media.videos) {
      return 'a video.';
    } else if (media.docs) {
      return 'a file.';
    } else return 'a voice message.';
  };

  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Chats list</span>
        <FontAwesomeIcon color="white" size="1x" icon={faArrowDown} />
      </DropdownButton>
      <List isDropdownOpen={isDropdownOpen}>
        {chats.map(chat => {
          const receiver: ChatUser | undefined = chat.users.find(
            user => user.id !== currentUser.id
          );
          if (chat.messages.length) {
            const l = chat.messages.length - 1;
            const msg = chat.messages[l];
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
                  <div
                    className="delete"
                    onClick={() => deleteChat(chat, currentUser, receiver, dispatch)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                  </div>
                  <Message>
                    {!msg.media ? (
                      <span>
                        {msg.user.id === receiver.id ? '' : 'You: '}
                        {msg.text.length > 20 ? msg.text.substring(0, 15) + '...' : msg.text}
                      </span>
                    ) : (
                      <span>
                        {msg.user.id === receiver.id
                          ? receiver.name + ' sent ' + displaySpanText(msg.media)
                          : 'You sent ' + displaySpanText(msg.media)}
                      </span>
                    )}
                  </Message>
                  {msg.user.id === currentUser.id && (
                    <div className="status">
                      <FontAwesomeIcon icon={msg.wasViewed ? faCheckCircle : faCheck} />
                    </div>
                  )}
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
                  <div
                    className="delete"
                    onClick={() => deleteChat(chat, currentUser, receiver, dispatch)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                  </div>
                  <Message>
                    {!msg.media ? (
                      <span>
                        You: {msg.text.length > 20 ? msg.text.substring(0, 15) + '...' : msg.text}
                      </span>
                    ) : (
                      <span>You sent {displaySpanText(msg.media)}</span>
                    )}
                  </Message>
                  <div className="status">
                    <FontAwesomeIcon icon={msg.wasViewed ? faCheckCircle : faCheck} />
                  </div>
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
                  <div
                    className="delete"
                    onClick={() => deleteChat(chat, currentUser, receiver, dispatch)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                  </div>
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
                  <div
                    className="delete"
                    onClick={() => deleteChat(chat, currentUser, undefined, dispatch)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                  </div>
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
