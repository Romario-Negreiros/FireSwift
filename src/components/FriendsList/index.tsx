import React from 'react';

import { Container } from './styles';
import { ProfileCard, Loader } from '..';
import { Exception, InnerCenteredContainer } from '../../global/styles';

import handleFirebaseError from '../../utils/handleFirebaseError';
import { firestoredb } from '../../lib';

interface Props {
  friendsIds?: string[];
}

interface User {
  id: string;
  name: string;
}

const FriendsList: React.FC<Props> = ({ friendsIds }) => {
  const [users, setUsers] = React.useState<User[] | null>(null);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const usersSnapshot = await firestoredb.getDocs(
          firestoredb.collection(firestoredb.db, 'users')
        );
        const users: User[] = [];
        usersSnapshot.forEach(user => {
          const { id } = user;
          const { name } = user.data();
          if (friendsIds) {
            if (friendsIds.some(friendId => friendId === id)) users.push({ id, name });
          } else users.push({ id, name });
        });
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
          <Exception>
            <p>{error}</p>
          </Exception>
        </InnerCenteredContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ul>
        {[1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1].map(() => (
          <ProfileCard />
        ))}
      </ul>
    </Container>
  );
};

export default FriendsList;
