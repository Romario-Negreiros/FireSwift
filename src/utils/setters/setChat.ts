import { v4 as uuidv4 } from 'uuid';
import { firestoredb, realtimedb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import handleError from '../general/handleError';
import { AppDispatch } from '../../app/store';
import { updateUser } from '../../features/user/userSlice';
import { Chat, User } from '../../global/types';

interface ShortUser {
  id: string;
  name: string;
  picture: string;
  chats: {
    id: string;
    receiverID: string;
  }[];
}

const setChat = async (
  desiredUser: ShortUser,
  currentUser: User,
  dispatch: AppDispatch,
  history: any
) => {
  try {
    if (currentUser.chats.some(chat => chat.receiverID === desiredUser.id)) {
      currentUser.chats.forEach(chat => {
        if (chat.receiverID === desiredUser.id) {
          history.push({
            pathname: '/chats',
            state: { chatID: chat.id },
          });
        }
      });
      return;
    }
    const chatID = uuidv4();
    const users = [
      {
        id: currentUser.id,
        name: currentUser.name,
        picture: currentUser.picture,
        chats: [...currentUser.chats, { id: chatID, receiverID: desiredUser.id }],
      },
      {
        id: desiredUser.id,
        name: desiredUser.name,
        picture: desiredUser.picture,
        chats: [...desiredUser.chats, { id: chatID, receiverID: currentUser.id }],
      },
    ];
    const chat: Chat = {
      id: chatID,
      users: users,
      messages: [],
      creationDate: getFormattedDate(),
    };
    await realtimedb.set(realtimedb.dbRef(realtimedb.db, `chats/${chatID}`), chat);
    const currentUserRef = firestoredb.doc(firestoredb.db, 'users', currentUser.id);
    const desiredUserRef = firestoredb.doc(firestoredb.db, 'users', desiredUser.id);
    await firestoredb.updateDoc(currentUserRef, {
      chats: users[0].chats,
    });
    await firestoredb.updateDoc(desiredUserRef, {
      chats: users[1].chats,
    });
    dispatch(updateUser({ ...currentUser, chats: [...users[0].chats] }));
    history.push({
      pathname: 'chats',
      state: { chatID: chat.id },
    });
  } catch (err) {
    handleError(err, 'creating a new chat.');
  }
};

export default setChat;
