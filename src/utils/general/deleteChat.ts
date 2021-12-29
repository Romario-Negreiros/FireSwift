import { AppDispatch } from '../../app/store';
import { toast } from 'react-toastify';
import { storage, realtimedb, firestoredb } from '../../lib';
import { updateUser } from '../../features/user/userSlice';

import { Chat, User, ChatUser } from '../../global/types';

const deleteChat = async (
  chat: Chat,
  currentUser: User,
  receiver: ChatUser | undefined,
  dispatch: AppDispatch,
  setCurrentChat: (currentChat: string) => void
) => {
  try {
    const storageRef = storage.ref(storage.storage, `chats/${chat.id}`);
    const userRef = firestoredb.doc(firestoredb.db, 'users', currentUser.id);
    const chatRef = realtimedb.dbRef(realtimedb.db, `chats/${chat.id}`);
    const currentUserCopy: User = JSON.parse(JSON.stringify(currentUser));
    const chatIndex = currentUserCopy.chats.findIndex(chatObj => chat.id === chatObj.id);
    currentUserCopy.chats.splice(chatIndex, 1);
    await (async () => {
      try {
        await storage.deleteObject(storageRef);
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    })();
    await realtimedb.remove(chatRef);
    await firestoredb.updateDoc(userRef, {
      chats: currentUserCopy.chats,
    });
    if (receiver) {
      const receiverRef = firestoredb.doc(firestoredb.db, 'users', receiver.id);
      const receiverCopy: ChatUser = JSON.parse(JSON.stringify(receiver));
      const chatIndex = receiverCopy.chats.findIndex(chatObj => chat.id === chatObj.id);
      receiverCopy.chats.splice(chatIndex, 1);
      await firestoredb.updateDoc(receiverRef, {
        chats: receiverCopy.chats,
      });
    }
    dispatch(updateUser({ ...currentUserCopy }));
    toast('Chat succesfully deleted!');
    setCurrentChat('');
  } catch (err) {
    if (err instanceof Error) {
      toast.error("We couldn't delete the chat, please try again!");
      console.error('Error on deleting chat => ' + err.message);
    }
  }
};

export default deleteChat;
