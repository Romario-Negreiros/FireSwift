import { v4 as uuidv4 } from 'uuid';
import { realtimedb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import { toast } from 'react-toastify';

import { Chat, Message, User } from '../../global/types';

const setMessage = async (chat: Chat, user: User, text: string, setValue: (value: string) => void) => {
  try {
    const message: Message = {
      id: uuidv4(),
      user: {
        id: user.id,
        name: user.name,
        picture: user.picture,
      },
      text,
      viewed: false,
      sentDate: getFormattedDate(),
    };
    const updates: any = {}
    updates[`chats/${chat.id}/messages`] = [...chat.messages, message]; 
    await realtimedb.update(realtimedb.dbRef(realtimedb.db), updates);
    setValue('');
  } catch (err) {
    if (err instanceof Error) toast.error('Unable to send the message ' + err.message);
  }
};

export default setMessage;
