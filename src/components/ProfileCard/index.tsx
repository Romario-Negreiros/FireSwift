import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router';
import Friend from '../../utils/Friend';

import { Profile } from './styles';

import Mock from '../../assets/mock-profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { User } from '../../global/types';

interface Props {
  user: {
    id: string;
    name: string;
  };
  friendsIds: string[];
  setUser?: (callback: ((state: User | null) => User | null)) => void;
}

const ProfileCard: React.FC<Props> = ({ user, friendsIds, setUser }) => {
  const history = useHistory();
  const currentUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  return (
    <Profile state={currentUser ? (currentUser.friends.includes(user.id) ? 'remove' : 'add') : ''}>
      <div
        onClick={() =>
          history.push({
            pathname: `/${user.name}`,
            state: { id: user.id },
          })
        }
      >
        <img src={Mock} alt={user.name} />
      </div>
      <div
        onClick={() =>
          history.push({
            pathname: `/${user.name}`,
            state: { id: user.id },
          })
        }
      >
        <span>{user.name}</span>
      </div>
      {currentUser ? (
        currentUser.friends.includes(user.id) ? (
          <button onClick={() => {
            Friend.remove(user.id, currentUser, dispatch);
            const index = friendsIds.indexOf(user.id);
            friendsIds.splice(index, 1);
            if(setUser)
            setUser(state => { 
              return { ...state, friends: friendsIds } as User
            });
        }}>
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
        <button onClick={() => toast('You need to be logged in to complete this action!')}>
          Add friend
          <FontAwesomeIcon size="1x" color="white" icon={faUserPlus} />
        </button>
      )}
    </Profile>
  );
};

export default ProfileCard;
