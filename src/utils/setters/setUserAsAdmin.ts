import { firestoredb } from '../../lib';
import { toast } from 'react-toastify';
import handleFirebaseError from '../general/handleFirebaseError';
import { v4 as uuidv4 } from 'uuid';
import getFormattedDate from '../getters/getFormattedDate';

import { GroupUser, User, Group, Roles, Notification } from '../../global/types';

const setUserAsAdmin = async (
  currentUser: User,
  user: GroupUser,
  group: Group,
  setGroup: (group: Group | null) => void
) => {
  try {
    const userCopy: GroupUser = JSON.parse(JSON.stringify(user));
    const groupCopy: Group = JSON.parse(JSON.stringify(group));
    const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
    const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
    const groupIndex = userCopy.groups.findIndex(uGroup => uGroup.id === group.id);
    const userIndex = groupCopy.users.findIndex(gpUser => gpUser.id === group.id);
    userCopy.groups[groupIndex].role = Roles.Admin;
    userCopy.role = Roles.Admin;
    groupCopy.users.splice(userIndex, 1, userCopy);
    groupCopy.admins.push(userCopy);
    const newNotification: Notification = {
      id: uuidv4(),
      sentBy: {
        id: currentUser.id,
        name: currentUser.name,
        picture: currentUser.picture,
      },
      wasViewed: false,
      message: `${currentUser.name} promoted you to admin of ${group.name}!`,
      sentAt: getFormattedDate(),
      group: {
        id: group.id,
        name: group.name,
      },
    };
    const userSnap = await firestoredb.getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as Omit<User, 'id'>;
      userData.notifications.unshift(newNotification);
      await firestoredb.updateDoc(userRef, {
        notifications: userData.notifications,
      });
    }

    await firestoredb.updateDoc(userRef, {
      groups: userCopy.groups,
    });
    await firestoredb.updateDoc(groupRef, {
      users: groupCopy.users,
      admins: groupCopy.admins,
    });

    setGroup(groupCopy);
    toast(`${user.name} is now an admin!`);
  } catch (err) {
    handleFirebaseError(err);
  }
};

export default setUserAsAdmin;
