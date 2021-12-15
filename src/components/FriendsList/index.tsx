import React from 'react';

import { Container } from './styles';
import { ProfileCard, Loader, Exception } from '..';
import { InnerCenteredContainer } from '../../global/styles';

import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { firestoredb } from '../../lib';

import { User } from '../../global/types';

interface Props {
  friendsIds?: string[];
}

interface ShortUser {
  id: string;
  name: string;
  picture: string;
}

const FriendsList: React.FC<Props> = ({ friendsIds }) => {
  const [users, setUsers] = React.useState<ShortUser[] | null>(null);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const usersSnapshot = await firestoredb.getDocs(
          firestoredb.collection(firestoredb.db, 'users')
        );
        const users: ShortUser[] = [];

        usersSnapshot.forEach(user => {
          const { id } = user;
          const userData = user.data() as Omit<User, 'id'>;
          const userObj: ShortUser = {
            id,
            name: userData.name,
            picture: userData.picture,
          };
          
          if (friendsIds) {
            if (friendsIds.some(friendId => friendId === userObj.id)) users.push(userObj);
          } else users.push(userObj);
        });
      
        if (!users.length) setError('Nothing to see here!');
        setUsers(users);
      } catch (err) {
        handleFirebaseError(err, setError);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [friendsIds]);

  if (!isLoaded) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Loader />
        </InnerCenteredContainer>
      </Container>
    );
  } else if (error || !users) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Exception message={error} />
        </InnerCenteredContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ul>
        {users.map(user => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </ul>
    </Container>
  );
};

export default FriendsList;
