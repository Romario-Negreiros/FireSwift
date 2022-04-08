import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import deleteChat from '../../utils/general/deleteChat';

import { Container, DropdownButton, List, User, Message, Alert } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faCheckCircle,
  faTrash,
  faCheck,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

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

  const handleClick = (chatID: string) => {
    setCurrentChat(chatID);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

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
          let newMessages = 0;
          chat.messages.forEach(msg =>
            !msg.wasViewed && msg.user.id !== currentUser.id ? newMessages++ : ''
          );
          if (!chat.users) {
            return (
              <li key={chat.id}>
                <User>
                  <img
                    src={currentUser.picture ? currentUser.picture : DefaultPicture}
                    alt={currentUser.name}
                  />
                  <span>{currentUser.name}</span>
                </User>
                <Message>
                  <span>User you were chatting to has been deleted!</span>
                </Message>
                {newMessages > 0 && (
                  <Alert>
                    <span>{newMessages}</span>
                  </Alert>
                )}
                <div
                  className="delete"
                  onClick={() => deleteChat(chat, currentUser, undefined, dispatch, setCurrentChat)}
                >
                  <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                </div>
                <div className="chat" onClick={() => handleClick(chat.id)}>
                  <FontAwesomeIcon icon={faCommentDots} color="red" size="2x" />
                </div>
              </li>
            );
          } else {
            const receiver: ChatUser | undefined = chat.users.find(
              user => user.id !== currentUser.id
            );
            if (chat.messages.length) {
              const l = chat.messages.length - 1;
              const msg = chat.messages[l];
              if (receiver) {
                return (
                  <li key={chat.id}>
                    <User>
                      <img
                        src={receiver.picture ? receiver.picture : DefaultPicture}
                        alt={receiver.name}
                      />
                      <span>{receiver.name}</span>
                    </User>
                    <div
                      className="delete"
                      onClick={() =>
                        deleteChat(chat, currentUser, receiver, dispatch, setCurrentChat)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                    </div>
                    <div className="chat" onClick={() => handleClick(chat.id)}>
                      <FontAwesomeIcon icon={faCommentDots} color="red" size="2x" />
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
                    {newMessages > 0 && (
                      <Alert>
                        <span>{newMessages}</span>
                      </Alert>
                    )}
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
                  <li key={chat.id}>
                    <User>
                      <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
                      <span>{user.name}</span>
                    </User>
                    <div
                      className="delete"
                      onClick={() =>
                        deleteChat(chat, currentUser, receiver, dispatch, setCurrentChat)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                    </div>
                    <div className="chat" onClick={() => handleClick(chat.id)}>
                      <FontAwesomeIcon icon={faCommentDots} color="red" size="2x" />
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
                    {newMessages > 0 && (
                      <Alert>
                        <span>{newMessages}</span>
                      </Alert>
                    )}
                    <div className="status">
                      <FontAwesomeIcon icon={msg.wasViewed ? faCheckCircle : faCheck} />
                    </div>
                  </li>
                );
              }
            } else {
              if (receiver) {
                return (
                  <li key={chat.id}>
                    <User>
                      <img
                        src={receiver.picture ? receiver.picture : DefaultPicture}
                        alt={receiver.name}
                      />
                      <span>{receiver.name}</span>
                    </User>
                    <div
                      className="delete"
                      onClick={() =>
                        deleteChat(chat, currentUser, receiver, dispatch, setCurrentChat)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                    </div>
                    <div className="chat" onClick={() => handleClick(chat.id)}>
                      <FontAwesomeIcon icon={faCommentDots} color="red" size="2x" />
                    </div>
                  </li>
                );
              } else {
                const user = chat.users[0];
                return (
                  <li key={chat.id}>
                    <User>
                      <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
                      <span>{user.name}</span>
                    </User>
                    <div
                      className="delete"
                      onClick={() =>
                        deleteChat(chat, currentUser, undefined, dispatch, setCurrentChat)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                    </div>
                    <div className="chat" onClick={() => handleClick(chat.id)}>
                      <FontAwesomeIcon icon={faCommentDots} color="red" size="2x" />
                    </div>
                  </li>
                );
              }
            }
          }
        })}
      </List>
    </Container>
  );
};

export default ChatsList;
