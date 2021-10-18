import React from 'react';

import { firestoredb } from '../../lib';
import { useHistory } from 'react-router-dom';
import handleFirebaseError from '../../utils/handleFirebaseError';
import { toast } from 'react-toastify';

import { Exception } from '../../global/styles';
import { Container, Manage, Picture, UserBio, UserInfo, Friends } from './styles';
import FakePicture from '../../assets/mock-profile.jpg';
import { FriendsList, Loader } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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

  React.useEffect(() => {
    (async () => {
      if (state) {
        try {
          const userRef = firestoredb.doc(firestoredb.db, 'users', state.id);
          const userSnap = await firestoredb.getDoc(userRef);
          if (userSnap.exists()) {
            setUser(userSnap.data() as User);
          } else setError('Nothing was found. The user might not exist!');
        } catch (err) {
          handleFirebaseError(err, setError);
        }
      } else {
        toast("The user doesn't exist!");
        setError('Nothing was found. The user might not exist!');
      }
      setIsLoaded(true);
    })();
  }, [state]);

  if (!isLoaded) {
    return <Loader />;
  } else if (error || !user) {
    return (
      <Exception>
        <p>{error}</p>
      </Exception>
    );
  }
  return (
    <Container>
      <Picture>
        <img src={FakePicture} alt={user?.name} />
        <h1>{user.name}</h1>
      </Picture>
      <Manage>
        <span>Add friend</span>
        <FontAwesomeIcon size="2x" color="purple" icon={faCheck} />
      </Manage>
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
        <FriendsList />
      </Friends>
    </Container>
  );
};

export default UserProfile;
