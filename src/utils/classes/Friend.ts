import { User } from '../../global/types';

import { toast } from 'react-toastify';
import handleError from '../general/handleError';

import { firestoredb } from '../../lib';
import { updateUser } from '../../features/user/userSlice';

import { AppDispatch } from '../../app/store';

class Friend {
  static remove = async (id: string, user: User, dispatch: AppDispatch) => {
    try {
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      const newFriendsList = user.friends.filter(fid => fid !== id);

      await firestoredb.updateDoc(userRef, {
        friends: [...newFriendsList],
      });

      const userSnap = await firestoredb.getDoc(userRef);

      if (userSnap.exists()) {
        const uid = userSnap.id;
        const userData = userSnap.data() as Omit<User, 'id'>;
        dispatch(updateUser({ id: uid, ...userData }));
        toast("User removed from your friend's list");
      } else toast.error("Looks like the user doesn't exist!");
    } catch (err) {
      handleError(err, 'removing user from friends list.');
    }
  };

  static add = async (id: string, user: User, dispatch: AppDispatch) => {
    if (user.id !== id) {
      try {
        const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);

        await firestoredb.updateDoc(userRef, {
          friends: [id, ...user.friends],
        });

        const userSnap = await firestoredb.getDoc(userRef);
        if (userSnap.exists()) {
          const id = userSnap.id;
          const user = userSnap.data() as Omit<User, 'id'>;
          dispatch(updateUser({ id, ...user }));
          toast("User added in your friend's list");
        } else toast.error("Looks like the user doesn't exist!");
      } catch (err) {
        handleError(err, 'adding user to friends list.');
      }
    } else toast.error('You cannot add yourself as friend!');
  };
}

export default Friend;
