import { User } from "../global/types";

import { firestoredb } from '../lib';
import { useAppDispatch } from "../app/hooks";
import { updateUser } from "../features/user/userSlice";

const dispatch = useAppDispatch();

class Friend {

  static remove = async (id: string, user: User) => {
    const userRef = firestoredb.doc(firestoredb.db, 'users', user.id)

    const newFriendsList = user.friends.filter(fid => fid !== id);

    await firestoredb.updateDoc(userRef, {
      friends: [...newFriendsList]
    });

    const userSnap = await firestoredb.getDoc(userRef);
    if(userSnap.exists()) {
      const uid = userSnap.id;
      const userData = userSnap.data() as Omit<User, 'id'>;
      dispatch(updateUser({ id: uid, ...userData }))
    }
  };

  static add = async (id: string, user: User) => {
    const userRef = firestoredb.doc(firestoredb.db, 'users', user.id)

    await firestoredb.updateDoc(userRef, {
      friends: [ id, ...user.friends]
    });
    
    const userSnap = await firestoredb.getDoc(userRef);
    if(userSnap.exists()) {
      const id = userSnap.id;
      const user = userSnap.data() as Omit<User, 'id'>
      dispatch(updateUser({ id, ...user }))
    }
    
  };

};

export default Friend;
