import React from 'react';

import getInputItems from '../../utils/getters/getInputItems';
import setMessage from '../../utils/setters/setMessage';
import { toast } from 'react-toastify';

import { Container, Message, Options, Input, Media, FileOptions, CustomLabelBox } from './styles';
import { CenteredContainer } from '../../global/styles';
import { Exception, Contents, AudioRecorder, Portal } from '..';
import { DeleteMessage } from '../Portal/Modals';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faPaperPlane,
  faImage,
  faVideo,
  faFile,
  faMicrophone,
  faTrash,
  faShare,
} from '@fortawesome/free-solid-svg-icons';

import { Chat, User } from '../../global/types';

interface Props {
  currentChat: string;
  chats: Chat[];
  currentUser: User;
}

const CurrentChat: React.FC<Props> = ({ currentChat, chats, currentUser }) => {
  const [value, setValue] = React.useState('');
  const [chat, setChat] = React.useState<Chat | null>(null);
  const [optionsVisible, setOptionsVisible] = React.useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = React.useState(false);
  const [deleteMessageID, setDeleteMessageID] = React.useState('');
  const inputRef = React.useRef(null);

  const handleSendMessage = (chat: Chat) => {
    const files = getInputItems(['chatimg', 'chatvid', 'chatdoc']);
    if (files.images.length || files.videos.length || files.docs.length) {
      setMessage(chat, currentUser, value, setValue, files);
    } else if (value) {
      setMessage(chat, currentUser, value, setValue);
    } else toast.error('You cannot send empty messages!');
  };

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
            {msg.media && (
              <Media>
                <Contents item={msg} />
              </Media>
            )}
            {msg.text ? (
              <div>
                <span>{msg.text}</span>
              </div>
            ) : (
              ''
            )}
            <Options className="options" status={msg.user.id === currentUser.id ? 'owner' : ''}>
              <li onClick={() => setDeleteMessageID(msg.id)}>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </li>
              <li>
                <FontAwesomeIcon icon={faShare} color="purple" />
              </li>
            </Options>
          </Message>
        ))}
      </ul>
      {!showAudioRecorder ? (
        <Input>
          <input
            ref={inputRef}
            name="comment"
            placeholder="Aa"
            value={value}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setValue(event.currentTarget.value)
            }
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSendMessage(chat);
              }
            }}
          />
          <div onClick={() => handleSendMessage(chat)}>
            <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
          </div>
          <div onClick={() => setOptionsVisible(!optionsVisible)}>
            <FontAwesomeIcon
              color="purple"
              size="2x"
              icon={optionsVisible ? faAngleDoubleDown : faAngleDoubleUp}
            />
          </div>
          <FileOptions optionsVisible={optionsVisible}>
            <li>
              <CustomLabelBox htmlFor="chatimg">
                <FontAwesomeIcon icon={faImage} color="purple" size="2x" />
                <input
                  type="file"
                  accept="image/*"
                  name="chatimg"
                  id="chatimg"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
              <div className="ballon">
                <span>+Image</span>
              </div>
            </li>
            <li>
              <CustomLabelBox htmlFor="chatvid">
                <FontAwesomeIcon icon={faVideo} color="purple" size="2x" />
                <input
                  type="file"
                  accept="video/*"
                  name="chatvid"
                  id="chatvid"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
              <div className="ballon">
                <span>+Video</span>
              </div>
            </li>
            <li>
              <CustomLabelBox htmlFor="chatdoc">
                <FontAwesomeIcon icon={faFile} color="purple" size="2x" />
                <input
                  type="file"
                  accept=".pdf,.word"
                  name="chatdoc"
                  id="chatdoc"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
              <div className="ballon">
                <span>+File</span>
              </div>
            </li>
            <li onClick={() => setShowAudioRecorder(true)}>
              <CustomLabelBox>
                <FontAwesomeIcon icon={faMicrophone} color="purple" size="2x" />
              </CustomLabelBox>
              <div className="ballon">
                <span>Audio</span>
              </div>
            </li>
          </FileOptions>
        </Input>
      ) : (
        <AudioRecorder
          setShowAudioRecorder={setShowAudioRecorder}
          chat={chat}
          user={currentUser}
          text={value}
          setValue={setValue}
        />
      )}
      {deleteMessageID && <Portal><DeleteMessage chat={chat} msgID={deleteMessageID} setDeleteMessageID={setDeleteMessageID} /></Portal>}
    </Container>
  );
};

export default CurrentChat;
