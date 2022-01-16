import handleFirebaseError from '../general/handleFirebaseError';
import { firestoredb } from '../../lib';
import { v4 as uuidv4 } from 'uuid';
import getFormattedDate from '../getters/getFormattedDate';

import { Group, GroupUser, Roles, User, Notification } from '../../global/types';

const setGroupOwner = async (
  newOwner: GroupUser,
  group: Group,
  setGroup: (group: Group | null) => void
) => {
  try {
    const groupCopy: Group = JSON.parse(JSON.stringify(group));
    const userRef = firestoredb.doc(firestoredb.db, 'users', newOwner.id);
    const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
    const userSnap = await firestoredb.getDoc(userRef);
    const newNotification: Notification = {
      id: uuidv4(),
      sentBy: {
        id: group.owner.id,
        name: group.owner.name,
        picture: group.owner.picture,
      },
      wasViewed: false,
      message: `${group.owner.name} named!`,
      sentAt: getFormattedDate(),
      group: {
        id: group.id,
        name: group.name,
      },
    };
    if (userSnap.exists()) {
      const user = userSnap.data() as Omit<User, 'id'>;
      const groupIndex = user.groups.findIndex(uGp => uGp.id === group.id);
      user.groups[groupIndex].role = Roles.Owner;
      user.notifications.unshift(newNotification);
      const owner: User = {
        id: newOwner.id,
        ...user,
      };
      groupCopy.owner = owner;
      await firestoredb.updateDoc(userRef, {
        groups: user.groups,
        notifications: user.notifications,
      });
      await firestoredb.updateDoc(groupRef, {
        owner: groupCopy.owner,
      });
      setGroup(groupCopy);
    }
  } catch (err) {
    handleFirebaseError(err);
  }
};

export default setGroupOwner;
