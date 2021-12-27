import React from 'react';

import getInputItems from '../../utils/getters/getInputItems';
import setMessage from '../../utils/setters/setMessage';
import { toast } from 'react-toastify';

import { Container, Input, FileOptions, CustomLabelBox, ResponseView } from './styles';
import { CenteredContainer } from '../../global/styles';
import { Exception, AudioRecorder, Portal } from '..';
import { DeleteMessage } from '../Portal/Modals';
import { Message } from './break-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faPaperPlane,
  faImage,
  faVideo,
  faFile,
  faMicrophone,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { Chat, MsgReply, User } from '../../global/types';

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
  const [responseMsg, setResponseMsg] = React.useState<MsgReply | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = (chat: Chat) => {
    const files = getInputItems(['chatimg', 'chatvid', 'chatdoc']);
    if (files.images.length || files.videos.length || files.docs.length) {
      responseMsg
        ? setMessage(
            chat,
            currentUser,
            value,
            setValue,
            files,
            undefined,
            undefined,
            responseMsg,
            setResponseMsg
          )
        : setMessage(chat, currentUser, value, setValue, files);
    } else if (value) {
      responseMsg
        ? setMessage(
            chat,
            currentUser,
            value,
            setValue,
            undefined,
            undefined,
            undefined,
            responseMsg,
            setResponseMsg
          )
        : setMessage(chat, currentUser, value, setValue);
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
          <Message
            key={msg.id}
            msg={msg}
            currentUser={currentUser}
            inputRef={inputRef}
            responseMsg={responseMsg}
            setResponseMsg={setResponseMsg}
            setDeleteMessageID={setDeleteMessageID}
          />
        ))}
      </ul>
      {!showAudioRecorder ? (
        <Input>
          {responseMsg && (
            <ResponseView>
              <div className="wrapper">
                <h2>
                  Responding to{' '}
                  {responseMsg.id === currentUser.id ? 'yourself' : responseMsg.user.name}
                </h2>
                <div className="close" onClick={() => setResponseMsg(null)}>
                  <FontAwesomeIcon icon={faTimes} size="2x" color="purple" />
                </div>
              </div>
              {responseMsg && (
                <p>
                  {responseMsg.text.length > 50
                    ? responseMsg.text.substring(0, 25) + '...'
                    : responseMsg.text}
                </p>
              )}
              {responseMsg.media && (
                <p>
                  {(responseMsg.media.images && 'Image') ||
                    (responseMsg.media.videos && 'Video') ||
                    (responseMsg.media.docs && 'File') ||
                    (responseMsg.media.audios && 'Audio')}
                </p>
              )}
            </ResponseView>
          )}
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
          responseMsg={responseMsg}
          setResponseMsg={setResponseMsg}
        />
      )}
      {deleteMessageID && (
        <Portal>
          <DeleteMessage
            chat={chat}
            msgID={deleteMessageID}
            setDeleteMessageID={setDeleteMessageID}
          />
        </Portal>
      )}
    </Container>
  );
};

export default CurrentChat;
