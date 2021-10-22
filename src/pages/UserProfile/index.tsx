import React from 'react';

import Friend from '../../utils/Friend';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { firestoredb } from '../../lib';
import { useHistory } from 'react-router-dom';
import handleFirebaseError from '../../utils/handleFirebaseError';
import { toast } from 'react-toastify';

import { CenteredContainer } from '../../global/styles';
import { Container, Manage, Picture, UserBio, UserInfo, Friends } from './styles';
import FakePicture from '../../assets/mock-profile.jpg';
import { FriendsList, Loader, Exception } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../global/types';

interface State {
  id: string;
}

const UserProfile: React.FC = () => {
  const {
    location: { state },
  } = useHistory<State>();
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const currentUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      if (state) {
        try {
          const userRef = firestoredb.doc(firestoredb.db, 'users', state.id);
          const userSnap = await firestoredb.getDoc(userRef);
          if (userSnap.exists()) {
            const user = userSnap.data() as Omit<User, 'id'>;
            const id = userSnap.id;
            setUser({ id, ...user });
          } else setError('Nothing was found. The user might not exist!');
        } catch (err) {
          handleFirebaseError(err, setError);
        }
      } else {
        toast.error("The user doesn't exist!");
        setError('Nothing was found. The user might not exist!');
      }
      setIsLoaded(true);
    })();
  }, [state]);

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
  }
  return (
    <Container>
      <Picture>
        <img src={FakePicture} alt={user.name} />
        <h1>{user.name}</h1>
      </Picture>
      {currentUser && currentUser.id !== user.id ? currentUser.friends.includes(user.id) ? (
        <Manage onClick={() => Friend.remove(user.id, currentUser, dispatch)}>
          <span>Remove friend</span>
          <FontAwesomeIcon size="1x" color="purple" icon={faUserMinus} />
        </Manage>
      ) : (
        <Manage onClick={() => Friend.add(user.id, currentUser, dispatch)}>
          <span>Add friend</span>
          <FontAwesomeIcon size="1x" color="purple" icon={faUserPlus} />
        </Manage>
      ) : ''}
      <UserBio>
        <p>Addiiiiiiieu baaaaaa arrrrrriii babababababba</p>
      </UserBio>
      <UserInfo>
        <li>
          <h2>Age</h2>
          <span>18</span>
        </li>
        <li>
          <h2>Relationship</h2>
          <span>Single</span>
        </li>
        <li>
          <h2>Country</h2>
          <span>Argelia</span>
        </li>
        <li>
          <h2>Languages</h2>
          <span>French</span>
        </li>
        <li>
          <h2>Tastes</h2>
          <span>Music, sports</span>
        </li>
      </UserInfo>
      <Friends>
        <h2>Friends</h2>
        <FriendsList friendsIds={user.friends} />
      </Friends>
    </Container>
  );
};

export default UserProfile;
