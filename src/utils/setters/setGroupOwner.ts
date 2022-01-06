import handleFirebaseError from "../general/handleFirebaseError";
import { firestoredb } from '../../lib';

import { Group, GroupUser, User } from "../../global/types";

const setGroupOwner = async (newOwner: GroupUser, group: Group, setGroup: (group: Group | null) => void) => {
  try {
    const groupCopy: Group = JSON.parse(JSON.stringify(group));
    const userRef = firestoredb.doc(firestoredb.db, 'users', newOwner.id);
    const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
    const userSnap = await firestoredb.getDoc(userRef);
    if(userSnap.exists()) {
      const user = userSnap.data() as Omit<User, 'id'>;
      const owner: User = {
        id: newOwner.id,
        ...user
      }
      groupCopy.owner = owner;
      await firestoredb.updateDoc(groupRef, {
        owner: groupCopy.owner
      })
      setGroup(groupCopy);
    }
  } catch (err) {
    handleFirebaseError(err);
  }
};

export default setGroupOwner;