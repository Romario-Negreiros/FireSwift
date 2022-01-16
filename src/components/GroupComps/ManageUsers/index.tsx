import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import setChat from '../../../utils/setters/setChat';
import setUserAsAdmin from '../../../utils/setters/setUserAsAdmin';
import setUserAsMember from '../../../utils/setters/setUserAsMember';
import { toast } from 'react-toastify';
import { firestoredb } from '../../../lib';
import { v4 as uuidv4 } from 'uuid';
import getFormattedDate from '../../../utils/getters/getFormattedDate';

import { Container } from '../PostRequests/styles';
import { Exception } from '../..';
import {
  Author,
  Options,
  CustomIconBox,
  Input,
  InnerCenteredContainer,
} from '../../../global/styles';
import { User } from './styles';

import DefaultPicture from '../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCommentDots,
  faDoorOpen,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { Group, GroupUser, Roles, User as UserType, Notification } from '../../../global/types';

interface Props {
  group: Group;
  setGroup: (group: Group | null) => void;
  currentUser: UserType;
}

interface Inputs {
  filter: string;
}

const ManageUsers: React.FC<Props> = ({ group, setGroup, currentUser }) => {
  const [results, setResults] = React.useState<Group['users']>(group.users);
  const { register, handleSubmit } = useForm<Inputs>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSearch: SubmitHandler<Inputs> = ({ filter }) => {
    if (!filter.length) {
      const usersCopy: Group['users'] = JSON.parse(JSON.stringify(group.users));
      const ownerIndex = usersCopy.findIndex(user => user.role === Roles.Owner);
      usersCopy.splice(ownerIndex, 1);
      const results: GroupUser[] = [];
      if (
        currentUser.groups.some(uGroup => uGroup.id === group.id && uGroup.role === Roles.Admin)
      ) {
        usersCopy.forEach(user => (user.role !== Roles.Admin ? results.push(user) : null));
        setResults(results);
      } else setResults(usersCopy);
    } else {
      const results: Group['users'] = [];
      group.users.forEach(user => {
        if (user.name.toLowerCase().includes(filter.toLowerCase()) && user.role !== Roles.Owner) {
          if (
            user.id === currentUser.id &&
            currentUser.groups.some(uGroup => uGroup.id === group.id && uGroup.role === Roles.Admin)
          ) {
            return;
          } else results.push(user);
        }
      });
      setResults(results);
    }
  };

  const kickUser = async (user: GroupUser) => {
    try {
      const groupCopy: Group = JSON.parse(JSON.stringify(group));
      const userCopy: GroupUser = JSON.parse(JSON.stringify(user));
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
      const newNotification: Notification = {
        id: uuidv4(),
        sentBy: {
          id: currentUser.id,
          name: currentUser.name,
          picture: currentUser.picture,
        },
        wasViewed: false,
        message: `${currentUser.name} kicked you from ${group.name}!`,
        sentAt: getFormattedDate(),
        group: {
          id: group.id,
          name: group.name,
        },
      };
      const userSnap = await firestoredb.getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data() as Omit<UserType, 'id'>;
        userData.notifications.unshift(newNotification);
        await firestoredb.updateDoc(groupRef, {
          admins: groupCopy.admins,
          users: groupCopy.users,
        });
        await firestoredb.updateDoc(userRef, {
          groups: userCopy.groups,
          notifications: userData.notifications,
        });
        setGroup(groupCopy);
        toast('User deleted');
      }
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  React.useEffect(() => {
    const usersCopy: Group['users'] = JSON.parse(JSON.stringify(group.users));
    const ownerIndex = usersCopy.findIndex(user => user.role === Roles.Owner);
    usersCopy.splice(ownerIndex, 1);
    const results: GroupUser[] = [];
    if (currentUser.groups.some(uGroup => uGroup.id === group.id && uGroup.role === Roles.Admin)) {
      usersCopy.forEach(user => (user.role !== Roles.Admin ? results.push(user) : null));
      setResults(results);
    } else setResults(usersCopy);
  }, [group.users, currentUser.groups, group.id]);

  return (
    <Container>
      <li>
        <form onSubmit={handleSubmit(onSearch)}>
          <Input>
            <input {...register('filter')} placeholder="Search user..." />
            <button className="searchBtn" type="submit">
              <FontAwesomeIcon icon={faSearch} color="purple" size="2x" />
            </button>
          </Input>
        </form>
      </li>
      {results.length ? (
        results.map((user, i) => (
          <User key={user.id} className={i === 0 ? 'first' : ''}>
            <Author>
              <div>
                <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
              </div>
              <div className="name">
                <h2>{user.name}</h2>
                <small>Role: {user.role}</small>
              </div>
            </Author>
            <Options>
              <CustomIconBox
                onClick={() => {
                  history.push({
                    pathname: `/users/${user.name}`,
                    state: {
                      id: user.id,
                    },
                  });
                }}
                position="-0.9rem"
              >
                <FontAwesomeIcon icon={faUser} color="purple" size="2x" />
                <div className="ballon">
                  <span>Profile</span>
                </div>
              </CustomIconBox>
              <CustomIconBox
                onClick={() => {
                  setChat(user, currentUser, dispatch, history);
                }}
                position="-0.3rem"
              >
                <FontAwesomeIcon icon={faCommentDots} color="purple" size="2x" />
                <div className="ballon">
                  <span>Chat</span>
                </div>
              </CustomIconBox>
              <CustomIconBox onClick={() => kickUser(user)} position="-0.1rem">
                <FontAwesomeIcon icon={faDoorOpen} color="purple" size="2x" />
                <div className="ballon">
                  <span>Oust</span>
                </div>
              </CustomIconBox>
              <CustomIconBox
                position="-1rem"
                onClick={() => {
                  if (user.role === Roles.Member) setUserAsAdmin(currentUser, user, group, setGroup);
                  else if (user.role === Roles.Admin) setUserAsMember(currentUser, user, group, setGroup);
                }}
              >
                {user.role === Roles.Member && (
                  <FontAwesomeIcon icon={faArrowUp} color="purple" size="2x" />
                )}
                {user.role === Roles.Admin && (
                  <FontAwesomeIcon icon={faArrowDown} color="purple" size="2x" />
                )}
                <div className="ballon">
                  {user.role === Roles.Member && <span>Promote</span>}
                  {user.role === Roles.Admin && <span>Demote</span>}
                </div>
              </CustomIconBox>
            </Options>
          </User>
        ))
      ) : (
        <li>
          <InnerCenteredContainer>
            <Exception message="No user found! Clean the search input to see all users again!" />
          </InnerCenteredContainer>
        </li>
      )}
    </Container>
  );
};

export default ManageUsers;
