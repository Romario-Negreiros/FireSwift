import React from 'react';

import { Container } from './styles';
import { ProfileCard, Loader, Exception } from '..';
import { InnerCenteredContainer } from '../../global/styles';

import handleFirebaseError from '../../utils/handleFirebaseError';
import { firestoredb } from '../../lib';

import { User } from '../../global/types';

interface Props {
  friendsIds?: string[];
  setUser?: (callback: ((state: User | null) => User | null)) => void;
}

type Users = {
  id: string,
  name: string,
}[];

const FriendsList: React.FC<Props> = ({ friendsIds, setUser }) => {
  const [users, setUsers] = React.useState<Users | null>(null);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const usersSnapshot = await firestoredb.getDocs(
          firestoredb.collection(firestoredb.db, 'users')
        );
        const users: Users = [];
        usersSnapshot.forEach(user => {
          const { id } = user;
          const { name } = user.data() as User;
          if (friendsIds) {
            if (friendsIds.some(friendId => friendId === id)) users.push({ id, name });   
          } else users.push({ id, name });
        });
        if (!users.length) setError("You've got no friends yet!");
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
          <ProfileCard key={user.id} user={user} friendsIds={friendsIds as string[]} setUser={setUser} />
        ))}
      </ul>
    </Container>
  );
};

export default FriendsList;
