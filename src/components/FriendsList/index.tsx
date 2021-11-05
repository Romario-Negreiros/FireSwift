import React from 'react';

import { Container } from './styles';
import { ProfileCard, Loader, Exception } from '..';
import { InnerCenteredContainer } from '../../global/styles';

import handleFirebaseError from '../../utils/handleFirebaseError';
import { firestoredb, storage } from '../../lib';

import { User } from '../../global/types';

interface Props {
  friendsIds?: string[];
}

interface ShortUser {
  id: string;
  picture?: string;
  name: string;
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
          const { name } = user.data() as User;
          const userObj: ShortUser = {
            id: user.id,
            name,
          };
          
          if (friendsIds) {
            if (friendsIds.some(friendId => friendId === userObj.id)) users.push(userObj);
          } else users.push(userObj);
        });
        
        for(let x in users) {
          const storageRef = storage.ref(storage.storage, `users/${users[x].id}`);
          try {
            const pictureUrl = await storage.getDownloadURL(storageRef);
            users[x] = {
              ...users[x],
              picture: pictureUrl,
            };
          } catch(err) {}
        }

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
