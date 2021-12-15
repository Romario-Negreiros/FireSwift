import { v4 as uuidv4 } from 'uuid';
import { firestoredb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

import { Chat, User } from '../../global/types';
import type { AppDispatch } from '../../app/store';

const setChat = async (
  chatUsers: Chat['users'],
  currentUser: User,
  history: any,
  dispatch: AppDispatch
) => {
  try {
    const chatID = uuidv4();
    const formattedDate = getFormattedDate();
    chatUsers[0].chats = [
      ...chatUsers[0].chats,
      {
        chatID,
        receiverID: chatUsers[1].id,
      },
    ];
    chatUsers[1].chats = [
      ...chatUsers[1].chats,
      {
        chatID,
        receiverID: chatUsers[0].id,
      },
    ];
    const chat: Chat = {
      chatID,
      chatCreation: formattedDate,
      users: chatUsers,
      messages: [],
    };

    await firestoredb.setDoc(firestoredb.doc(firestoredb.db, 'chats', `/${chatID}`), chat);
    const user1Ref = firestoredb.doc(firestoredb.db, 'users', chatUsers[0].id);
    const user2Ref = firestoredb.doc(firestoredb.db, 'users', chatUsers[1].id);
    await firestoredb.updateDoc(user1Ref, {
      chats: chatUsers[0].chats,
    });
    if (chatUsers[0].id !== chatUsers[1].id)
      await firestoredb.updateDoc(user2Ref, {
        chats: chatUsers[1].chats,
      });
    dispatch(
      updateUser({
        ...currentUser,
        chats: [...chatUsers[0].chats],
      })
    );
    history.push({
      pathname: 'chats',
      state: { chatID },
    });
  } catch (err) {
    if (err instanceof Error) toast.error('Something went wrong!' + err.message);
  }
};

export default setChat;
