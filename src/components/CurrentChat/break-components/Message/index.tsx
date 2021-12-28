import React from 'react';

import handleError from '../../../../utils/general/handleError';
import { realtimedb } from '../../../../lib';

import { Container, Reply, Media, Options } from './styles';
import { Contents } from '../../../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShare, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

import { Chat, Message as MsgType, MsgReply, User } from '../../../../global/types';

interface Props {
  chat: Chat;
  index: number;
  msg: MsgType;
  currentUser: User;
  inputRef: React.RefObject<HTMLInputElement>;
  responseMsg: MsgReply | null;
  setResponseMsg: (responseMsg: MsgReply | null) => void;
  setDeleteMessageID: (deleteMessageID: string) => void;
}

const Message: React.FC<Props> = ({
  chat,
  index,
  msg,
  currentUser,
  inputRef,
  responseMsg,
  setResponseMsg,
  setDeleteMessageID,
}) => {
  React.useEffect(() => {
    if (!msg.wasViewed && msg.user.id !== currentUser.id) {
      (async () => {
        try {
          const msgCopy: MsgType = JSON.parse(JSON.stringify(msg));
          msgCopy.wasViewed = true;
          const chatCopy: Chat = JSON.parse(JSON.stringify(chat));
          chatCopy.messages[index] = msgCopy;
          const updates: any = {};
          updates[`chats/${chat.id}/messages`] = chatCopy.messages;
          await realtimedb.update(realtimedb.dbRef(realtimedb.db), updates);
        } catch (err) {
          handleError(err, 'setting message as viewed.');
        }
      })();
    }
  }, [chat, currentUser.id, msg, index]);

  return (
    <Container key={msg.id} status={msg.user.id === currentUser.id ? 'owner' : ''}>
      {msg.isReplyingTo && (
        <Reply>
          <h2>
            {msg.user.id === currentUser.id
              ? `You responded to ${
                  msg.user.id === msg.isReplyingTo.user.id ? 'yourself' : msg.isReplyingTo.user.name
                }`
              : `${msg.user.name} responded to ${
                  msg.user.id !== msg.isReplyingTo.user.id ? 'you' : msg.isReplyingTo.user.name
                }`}
          </h2>
          {msg.isReplyingTo && (
            <p>
              {msg.isReplyingTo.text.length > 20
                ? msg.isReplyingTo.text.substring(0, 15) + '...'
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
      {chat.messages.length - 1 === index && msg.user.id === currentUser.id ? (
        <div className="status">
          <FontAwesomeIcon icon={msg.wasViewed ? faCheckCircle : faCheck} />
          <div className="ballon">
            <span>{msg.wasViewed  ? 'Visualized' : 'Sent'}</span>
          </div>
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
    </Container>
  );
};

export default Message;
