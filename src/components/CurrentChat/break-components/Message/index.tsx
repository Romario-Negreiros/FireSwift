import React from 'react';

import { Container, Reply, Media, Options } from './styles';
import { Contents } from '../../../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShare } from '@fortawesome/free-solid-svg-icons';
import { Message as MsgType, MsgReply, User } from '../../../../global/types';

interface Props {
  msg: MsgType;
  currentUser: User;
  inputRef: React.RefObject<HTMLInputElement>;
  responseMsg: MsgReply | null;
  setResponseMsg: (responseMsg: MsgReply | null) => void;
  setDeleteMessageID: (deleteMessageID: string) => void;
}

const Message: React.FC<Props> = ({
  msg,
  currentUser,
  inputRef,
  responseMsg,
  setResponseMsg,
  setDeleteMessageID,
}) => {
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
    </Container>
  );
};

export default Message;
