import React from 'react';

import { Container, DropdownButton, List, User, Message } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
      <audio controls src="https://cdn.fbsbx.com/v/t59.3654-21/269952433_3097241207192994_6315987645806055682_n.mp4/audioclip-1640226835000-13782.mp4?_nc_cat=104&ccb=1-5&_nc_sid=7272a8&_nc_ohc=BBDGCoi-C3sAX8rahqL&_nc_ht=cdn.fbsbx.com&oh=03_AVI7xdZigyaDENMjwBLHnucrO6L22C_PMw5O7-K1vccNBQ&oe=61C5CEEC&dl=1">
      
      </audio>
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
                    <div className="status">
                      <FontAwesomeIcon
                        color="purple"
                        size="1x"
                        icon={msg.viewed ? faCheckCircle : faCheck}
                      />
                    </div>
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
                    <div className="status">
                      <FontAwesomeIcon
                        color="purple"
                        size="1x"
                        icon={msg.viewed ? faCheckCircle : faCheck}
                      />
                    </div>
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
