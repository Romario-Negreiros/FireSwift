import React from 'react';

import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import setChat from '../../../utils/setters/setChat';
import { toast } from 'react-toastify';

import { Author, CustomIconBox, Options } from '../../../global/styles';
import { Container, List } from './styles';

import DefaultPiture from '../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

import { Group } from '../../../global/types';

interface Props {
  users: Group['users'];
}

const Users: React.FC<Props> = ({ users }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);

  return (
    <Container>
      <List>
        {users.map(user => (
          <li key={user.id}>
            <Author>
              <div>
                <img src={user.picture ? user.picture : DefaultPiture} alt={user.name} />
              </div>
              <div className="name">
                <h2>{user.name}</h2>
                <small>
                  In the group since: {user.entranceDate.date} - {user.entranceDate.time}
                </small>
              </div>
            </Author>
            <Options>
              <CustomIconBox
                onClick={() =>
                  history.push({
                    pathname: `/users/${user.name}`,
                    state: {
                      id: user.id,
                    },
                  })
                }
              >
                <FontAwesomeIcon icon={faUser} color="purple" size="2x" />
              </CustomIconBox>
              <CustomIconBox
                onClick={() => {
                  if (currentUser) setChat(user, currentUser, dispatch, history);
                  else toast.error('You need to be logged in to create a chat!');
                }}
              >
                <FontAwesomeIcon icon={faCommentDots} color="purple" size="2x" />
              </CustomIconBox>
            </Options>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Users;
