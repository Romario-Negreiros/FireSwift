import React from 'react';

import { toast } from 'react-toastify';
import { realtimedb, storage } from '../../../../lib';

import { ModalBG } from '../../../../global/styles';
import { Container, Message, Confirm, Cancel } from './styles';

import { Chat } from '../../../../global/types';

interface Props {
  chat: Chat;
  msgID: string;
  setDeleteMessageID: (deleteMessageID: string) => void;
}

const DeleteMessage: React.FC<Props> = ({ chat, msgID, setDeleteMessageID }) => {
  const handleConfirm = async () => {
    try {
      const chatCopy: Chat = JSON.parse(JSON.stringify(chat));
      const msgIndex = chatCopy.messages.findIndex(msg => msg.id === msgID);
      chatCopy.messages.splice(msgIndex, 1);
      const updates: any = {};
      updates[`chats/${chat.id}/messages`] = chatCopy.messages;
      if (chat.messages[msgIndex].media) {
        if (chat.messages[msgIndex].media.images) {
          const storageRef = storage.ref(storage.storage, `chats/${chat.id}/${msgID}/images/0`);
          await storage.deleteObject(storageRef);
        } else if (chat.messages[msgIndex].media.videos) {
          const storageRef = storage.ref(storage.storage, `chats/${chat.id}/${msgID}/videos/0`);
          await storage.deleteObject(storageRef);
        } else if (chat.messages[msgIndex].media.docs) {
          const storageRef = storage.ref(storage.storage, `chats/${chat.id}/${msgID}/docs/0`);
          await storage.deleteObject(storageRef);
        } else if (chat.messages[msgIndex].media.audios) {
          const storageRef = storage.ref(storage.storage, `chats/${chat.id}/${msgID}/audios/0`);
          await storage.deleteObject(storageRef);
        }
      }
      await realtimedb.update(realtimedb.dbRef(realtimedb.db), updates);
      toast('Message succesfully deleted!');
      setDeleteMessageID('');
    } catch (err) {
      if (err instanceof Error) {
        toast.error('Something went wrong! Please try again');
        console.error('Deleting message went wrong => ' + err.message);
      }
    }
  };

  const handleCancel = () => {
    setDeleteMessageID('');
  };

  return (
    <ModalBG>
      <Container>
        <Message>
          <h1>Are you sure you want to delete this message?</h1>
        </Message>
        <Confirm>
          <button onClick={handleConfirm}>Confirm</button>
        </Confirm>
        <Cancel>
          <button onClick={handleCancel}>Cancel</button>
        </Cancel>
      </Container>
    </ModalBG>
  );
};

export default DeleteMessage;
