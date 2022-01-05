import React from 'react';

import { useHistory } from 'react-router';
import { firestoredb } from '../../lib';
import handleFirebaseError from '../../utils/general/handleFirebaseError';

import { Container } from './styles';
import { Searcher } from '../Portal/Modals';
import { CustomIconBox, InnerCenteredContainer } from '../../global/styles';
import { Loader, Exception } from '..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

import { User, Group } from '../../global/types';

const SocialOptions: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  React.useEffect(() => {
    setError('');
    (async () => {
      try {
        const usersSnapshot = await firestoredb.getDocs(
          firestoredb.collection(firestoredb.db, 'users')
        );
        const usersList: User[] = [];
        usersSnapshot.forEach(userDoc => {
          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<User, 'id'>;
            const { id } = userDoc;
            usersList.push({ id, ...userData });
          }
        });
        const groupsSnapshot = await firestoredb.getDocs(
          firestoredb.collection(firestoredb.db, 'groups')
        );
        const groupsList: Group[] = [];
        groupsSnapshot.forEach(groupDoc => {
          if (groupDoc.exists()) {
            const groupData = groupDoc.data() as Group;
            groupsList.push(groupData);
          }
        });
        setUsers(usersList);
        setGroups(groupsList);
      } catch (err) {
        handleFirebaseError(err, setError);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  if (!isLoaded) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Loader size='2rem' />
        </InnerCenteredContainer>
      </Container>
    );
  } else if (error) {
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
      <ul className="innerList">
        <li>
          <ul className="tools">
            <CustomIconBox onClick={() => redirect('/create')}>
              <FontAwesomeIcon icon={faHammer} color="purple" size="2x" />
            </CustomIconBox>
          </ul>
        </li>
        <li>
          <Searcher content={[...users, ...groups]} />
        </li>
      </ul>
    </Container>
  );
};

export default SocialOptions;
