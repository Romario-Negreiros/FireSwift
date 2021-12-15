import React from 'react';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { clearUsers, queryUsers } from '../../../../features/users/usersSlice';
import { firestoredb } from '../../../../lib';
import handleFirebaseError from '../../../../utils/general/handleFirebaseError';
import Search from '../../../../utils/classes/Search';

import { Input } from '../../../../global/styles';
import { Container } from './styles';
import DropDown from './DropDown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Result, User } from '../../../../global/types';

interface Props {
  setIsModalVisible?: (isModalVisible: boolean) => void;
}

const Searcher: React.FC<Props> = ({ setIsModalVisible }) => {
  const user = useAppSelector(state => state.user.user);
  const users = useAppSelector(state => state.users.users);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [results, setResults] = React.useState<Result[]>([]);

  const handleClick = () => {
    if (setIsModalVisible) {
      setIsModalVisible(false);
    } else {
      setValue('');
    }
  };

  React.useEffect(() => {
    if (value) {
      setError('');
      if (!users) {
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
            dispatch(queryUsers(usersList));
          } catch (err) {
            handleFirebaseError(err, setError);
          }
        })();
      } else {
        Search.byBoth(users, value, setResults);
      }
    } else dispatch(clearUsers(null));
  }, [value, users, dispatch]);

  return (
    <Container>
      <section>
        <Input>
          <input
            value={value}
            onChange={event => {
              setValue(event.currentTarget.value);
            }}
            placeholder="Search something..."
          />
          <div onClick={handleClick}>
            <FontAwesomeIcon color="purple" size="2x" icon={faTimes} />
          </div>
        </Input>
      </section>
      {value && <DropDown error={error} results={results} user={user} />}
    </Container>
  );
};

export default Searcher;
