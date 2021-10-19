import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { useHistory } from 'react-router';
import Friend from '../../utils/Friend';

import { Profile } from './styles';

import Mock from '../../assets/mock-profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

interface Props {
  user: {
    id: string;
    name: string;
  };
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const history = useHistory();
  const currentUser = useAppSelector(state => state.user.user);

  return (
    <Profile state={currentUser ? currentUser.friends.includes(user.id) ? 'remove' : 'add' : ''}>
      <div onClick={() => history.push(`/${user.name}`)}>
        <img src={Mock} alt={user.name} />
      </div>
      <div onClick={() => history.push(`/${user.name}`)}>
        <span>{user.name}</span>
      </div>
      {currentUser ? (
        <button onClick={() => currentUser.friends.includes(user.id) ? Friend.remove(user.id, currentUser) : Friend.add(user.id, currentUser)}>
          {currentUser.friends.includes(user.id) ? 'Remove friend' : 'Add friend'}
          <FontAwesomeIcon size="1x" color="white" icon={currentUser.friends.includes(user.id) ? faUserMinus : faUserPlus} />
        </button>
      ) : (
        <button onClick={() => toast('You need to be logged in to complete this action!')}>
          Add friend
          <FontAwesomeIcon size="1x" color="white" icon={faUserPlus} />
        </button>
      )}
    </Profile>
  );
};

export default ProfileCard;
