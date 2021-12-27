import React from 'react';

import getInputItems from '../../utils/getters/getInputItems';
import setMessage from '../../utils/setters/setMessage';
import { toast } from 'react-toastify';

import {
  Container,
  Message,
  Options,
  Input,
  Media,
  FileOptions,
  CustomLabelBox,
  ResponseView,
  Reply,
} from './styles';
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
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { Chat, Message as MsgType, User } from '../../global/types';

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
  const [responseMsg, setResponseMsg] = React.useState<MsgType | null>(null);
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
          <Message key={msg.id} status={msg.user.id === currentUser.id ? 'owner' : ''}>
            {msg.isReplyingTo && (
              <Reply>
                <h2>
                  {msg.user.id === currentUser.id
                    ? `You responded to ${
                        msg.user.id === msg.isReplyingTo.user.id
                          ? 'yourself'
                          : msg.isReplyingTo.user.name
                      }`
                    : `${msg.user.name} responded to ${
                        msg.user.id !== msg.isReplyingTo.user.id ? 'you' : msg.isReplyingTo.user.name
                      }`}
                </h2>
                {msg.isReplyingTo && (
                  <p>
                    {msg.isReplyingTo.text.length > 50
                      ? msg.isReplyingTo.text.substring(0, 25) + '...'
                      : msg.isReplyingTo.text}
                  </p>
                )}
                {msg.isReplyingTo.media && (
                  <p>
                    {(msg.isReplyingTo.media.images && 'Image') ||
                      (msg.isReplyingTo.media.videos && 'Video') ||
                      (msg.isReplyingTo.media.docs && 'File') ||
                      (msg.isReplyingTo.media.audios && 'Audio')}
                  </p>
                )}
              </Reply>
            )}
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
              <li
                onClick={() => {
                  if (responseMsg && responseMsg.id === msg.id) {
                    setResponseMsg(null);
                  } else {
                    setResponseMsg(msg);
                    inputRef.current?.focus();
                  }
                }}
              >
                <FontAwesomeIcon icon={faShare} color="purple" />
              </li>
            </Options>
          </Message>
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
