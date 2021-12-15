import { v4 as uuidv4 } from 'uuid';
import { firestoredb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import { toast } from 'react-toastify';

import { Chat } from '../../global/types';

const setChat = async (chatUsers: Chat['users'], history: any) => {
  try {
    const chatID = uuidv4();
    const formattedDate = getFormattedDate();
    const chat: Chat = {
      chatID,
      chatCreation: formattedDate,
      users: chatUsers,
    };
    console.log(chat);
    await firestoredb.setDoc(firestoredb.doc(firestoredb.db, 'chats', `/${chatID}`), chat);
    const user1Ref = firestoredb.doc(firestoredb.db, 'users', chatUsers[0].id);
    const user2Ref = firestoredb.doc(firestoredb.db, 'users', chatUsers[1].id);
    await firestoredb.updateDoc(user1Ref, {
      chats: [
        {
          chatID,
          receiver: chatUsers[1].id,
        },
        ...chatUsers[0].chats,
      ],
    });
    await firestoredb.updateDoc(user2Ref, {
      chats: [
        {
          chatID,
          receiver: chatUsers[0].chats,
        },
        ...chatUsers[1].chats,
      ],
    });
    history.push({
      pathname: 'chats',
      state: { chatID },
    });
  } catch (err) {
    if (err instanceof Error) toast.error('Something went wrong!' + err.message);
  }
};

export default setChat;
