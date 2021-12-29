import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router';
import Friend from '../../utils/classes/Friend';

import { Profile } from './styles';

import DefaultPicture from '../../assets/default-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

interface Props {
  user: {
    id: string;
    name: string;
    picture: string;
  };
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const history = useHistory();
  const currentUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  return (
    <Profile state={currentUser ? (currentUser.friends.includes(user.id) ? 'remove' : 'add') : ''}>
      <div
        className="image"
        onClick={() =>
          history.push({
            pathname: `/users/${user.name}`,
            state: { id: user.id },
          })
        }
      >
        <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
      </div>
      <div
        onClick={() =>
          history.push({
            pathname: `/users/${user.name}`,
            state: { id: user.id },
          })
        }
      >
        <span>{user.name}</span>
      </div>
      {currentUser ? (
        currentUser.friends.includes(user.id) ? (
          <button onClick={() => Friend.remove(user.id, currentUser, dispatch)}>
            Remove friend
            <FontAwesomeIcon size="1x" color="white" icon={faUserMinus} />
          </button>
        ) : (
          <button onClick={() => Friend.add(user.id, currentUser, dispatch)}>
            Add friend
            <FontAwesomeIcon size="1x" color="white" icon={faUserPlus} />
          </button>
        )
      ) : (
        <button onClick={() => toast.error('You need to be logged in to complete this action!')}>
          Add friend
          <FontAwesomeIcon size="1x" color="white" icon={faUserPlus} />
        </button>
      )}
    </Profile>
  );
};

export default ProfileCard;
