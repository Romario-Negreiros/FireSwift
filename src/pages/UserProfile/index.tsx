import React from 'react';

import Friend from '../../utils/classes/Friend';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { firestoredb } from '../../lib';
import { useHistory } from 'react-router-dom';
import handleFirebaseError from '../../utils/general/handleFirebaseError';

import { CenteredContainer, InnerCenteredContainer } from '../../global/styles';
import {
  Container,
  Manage,
  Picture,
  UserBio,
  UserInfo,
  Friends,
  AccountOptions,
  Groups,
  Redirect,
} from './styles';
import { FriendsList, Loader, Exception, Portal } from '../../components';
import {
  ChangeAccountName,
  ChangePassword,
  ChangePicture,
  DeleteProfile,
  PrivateProfile,
  DeletePicture,
} from '../../components/Portal/Modals';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import DefaultPicture from '../../assets/default-picture.png';

import { User } from '../../global/types';

interface State {
  id: string;
}

const UserProfile: React.FC = () => {
  const {
    location: { state },
  } = useHistory<State>();
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [action, setAction] = React.useState('');

  const currentUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const switchModal = () => {
    if (user) {
      switch (action) {
        case 'changename':
          return <ChangeAccountName setIsModalVisible={setIsModalVisible} user={user} />;
        case 'changepwd':
          return <ChangePassword setIsModalVisible={setIsModalVisible} user={user} />;
        case 'deleteprofile':
          return <DeleteProfile setIsModalVisible={setIsModalVisible} user={user} />;
        case 'privateprofile':
          return <PrivateProfile setIsModalVisible={setIsModalVisible} user={user} />;
        case 'changepic':
          return <ChangePicture setIsModalVisible={setIsModalVisible} user={user} />;
        case 'deletepic':
          return <DeletePicture setIsModalVisible={setIsModalVisible} user={user} />;
        default:
          return;
      }
    }
  };

  const openModal = (action: string) => {
    setIsModalVisible(true);
    setAction(action);
  };

  React.useEffect(() => {
    if (state) {
      if (currentUser && state.id === currentUser.id) {
        setUser(currentUser);
        setIsLoaded(true);
      } else {
        (async () => {
          try {
            const userRef = firestoredb.doc(firestoredb.db, 'users', state.id);
            const userSnap = await firestoredb.getDoc(userRef);
            if (userSnap.exists()) {
              const user = userSnap.data() as Omit<User, 'id'>;
              setUser({ id: state.id, ...user });
            } else setError('Nothing was found. The user might not exist!');
          } catch (err) {
            handleFirebaseError(err, setError);
          } finally {
            setIsLoaded(true);
          }
        })();
      }
    } else {
      setError('Nothing was found. The user might not exist!');
    }
  }, [state, currentUser]);

  if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  } else if (error || !user) {
    return (
      <CenteredContainer>
        <Exception message={error} />
      </CenteredContainer>
    );
  } else if (user.isPrivate && (user.id !== currentUser?.id || !currentUser)) {
    const message = 'The user has made its profile private!';
    return (
      <CenteredContainer>
        <Exception message={message} />
      </CenteredContainer>
    );
  }
  return (
    <>
      <Container>
        <Picture>
          <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
          <h1>{user.name}</h1>
        </Picture>
        {currentUser ? (
          currentUser.id !== user.id ? (
            currentUser.friends.includes(user.id) ? (
              <Manage onClick={() => Friend.remove(user.id, currentUser, dispatch)}>
                <span>Remove friend</span>
                <FontAwesomeIcon size="1x" color="purple" icon={faUserMinus} />
              </Manage>
            ) : (
              <Manage onClick={() => Friend.add(user.id, currentUser, dispatch)}>
                <span>Add friend</span>
                <FontAwesomeIcon size="1x" color="purple" icon={faUserPlus} />
              </Manage>
            )
          ) : (
            <Manage>
              <Redirect
                to={{
                  pathname: '/editprofile',
                }}
              >
                <span>Edit profile</span>
                <FontAwesomeIcon size="1x" color="purple" icon={faEdit} />
              </Redirect>
            </Manage>
          )
        ) : (
          ''
        )}
        <UserBio>
          <p>{user.bio}</p>
        </UserBio>
        <UserInfo>
          <li>
            <h2>Age</h2>
            <span>{user.age}</span>
          </li>
          <li>
            <h2>Relationship</h2>
            <span>{user.relationship}</span>
          </li>
          <li>
            <h2>Country</h2>
            <span>{user.country}</span>
          </li>
          <li className="languages">
            <h2>Languages</h2>
            {user.languages.map((lang, i) => (
              <div key={`${lang.name}-${i}`}>
                <span>{lang.name}</span>
              </div>
            ))}
          </li>
          <li className="hobbies">
            <h2>Hobbies</h2>
            {user.hobbies.map((hobby, i) => (
              <div key={`${hobby.name}-${i}`}>
                <span>{hobby.name}</span>
              </div>
            ))}
          </li>
        </UserInfo>
        <Friends>
          <h2>Friends</h2>
          <FriendsList friendsIds={user.friends} />
        </Friends>
        <Groups>
          <h2>Groups</h2>
          {user.groups.length ? (
            <ul>
              {user.groups.map(group => (
                <li
                  key={group.id}
                >
                  <Redirect
                    to={{
                      pathname: `/groups/${group.name}`,
                      state: {
                        id: group.id,
                      },
                    }}
                  >
                    <h3>{group.name}</h3>
                    <p>Role: {group.role}</p>
                  </Redirect>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <InnerCenteredContainer>
                <Exception message="Nothing to see here!" />
              </InnerCenteredContainer>
            </div>
          )}
        </Groups>
        {currentUser && currentUser.id === user.id && (
          <AccountOptions>
            <li className="title">
              <h2>Account Options</h2>
            </li>
            <li onClick={() => openModal('changepwd')}>
              <span>Change password</span>
            </li>
            <li onClick={() => openModal('changename')}>
              <span>Change account name</span>
            </li>
            <li onClick={() => openModal('deleteprofile')}>
              <span>Delete profile</span>
            </li>
            <li onClick={() => openModal('privateprofile')}>
              <span>Make profile private</span>
            </li>
            <li onClick={() => openModal('changepic')}>
              <span>Change picture</span>
            </li>
            {user.picture && (
              <li onClick={() => openModal('deletepic')}>
                <span>Delete picture</span>
              </li>
            )}
          </AccountOptions>
        )}
      </Container>
      {isModalVisible && <Portal>{switchModal()}</Portal>}
    </>
  );
};

export default UserProfile;
