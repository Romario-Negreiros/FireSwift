import { firestoredb } from '../../lib';
import { updateUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import handleFirebaseError from '../general/handleFirebaseError';

import { AppDispatch } from '../../app/store';
import { Group as GroupType, User, GroupUser, Roles } from '../../global/types';
import getFormattedDate from '../getters/getFormattedDate';

class GroupAccess {
  static join = async (
    user: User,
    group: GroupType,
    dispatch: AppDispatch,
    setError: (error: string) => void,
    setGroup: (group: GroupType | null) => void
  ) => {
    try {
      const groupCopy: GroupType = JSON.parse(JSON.stringify(group));
      const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
      const groupUser: GroupUser = {
        id: user.id,
        name: user.name,
        picture: user.picture,
        chats: user.chats,
        entranceDate: getFormattedDate(),
        role: Roles.Member,
      };
      if (group.private) {
        groupCopy.requests.usersToJoin.push(groupUser);
        await firestoredb.updateDoc(groupRef, {
          requests: groupCopy.requests,
        });
        toast('You request to join the group was sent!');
      } else {
        const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
        const userCopy: User = JSON.parse(JSON.stringify(user));
        groupCopy.users.push(groupUser);
        userCopy.groups.push({
          id: group.id,
          name: group.name,
          role: Roles.Member,
        });
        await firestoredb.updateDoc(groupRef, {
          users: groupCopy.users,
        });
        await firestoredb.updateDoc(userRef, {
          groups: userCopy.groups,
        });
        dispatch(updateUser({ ...userCopy }));
        toast('You joined the group!');
        setGroup(groupCopy);
      }
    } catch (err) {
      handleFirebaseError(err, setError);
    }
  };

  static leave = async (
    user: User,
    group: GroupType,
    dispatch: AppDispatch,
    setError: (error: string) => void,
    setGroup: (group: GroupType | null) => void
  ) => {
    try {
      const groupCopy: GroupType = JSON.parse(JSON.stringify(group));
      const userCopy: User = JSON.parse(JSON.stringify(user));
      const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      const userIndex = groupCopy.users.findIndex(gpUser => gpUser.id === user.id);
      const groupIndex = userCopy.groups.findIndex(gp => gp.id === group.id);
      if (groupCopy.users[userIndex].role === Roles.Admin) {
        const adminIndex = groupCopy.admins.findIndex(adm => adm.id === user.id);
        groupCopy.admins.splice(adminIndex, 1);
      }
      groupCopy.users.splice(userIndex, 1);
      userCopy.groups.splice(groupIndex, 1);
      await firestoredb.updateDoc(groupRef, {
        users: groupCopy.users,
      });
      await firestoredb.updateDoc(userRef, {
        groups: userCopy,
      });
      dispatch(updateUser({ ...userCopy }));
      toast('You left the group!');
      setGroup(groupCopy);
    } catch (err) {
      handleFirebaseError(err, setError);
    }
  };
}

export default GroupAccess;
