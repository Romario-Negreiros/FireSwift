import React from 'react';

import { useHistory } from 'react-router';

import { Profile } from './styles';

import Mock from '../../assets/mock-profile.jpg';

const ProfileCard: React.FC = () => {
  const history = useHistory();
  const username = 'Yoooo Yaaaa Souza';

  return (
    <Profile key={Math.ceil(Math.random() * 456578)} onClick={() => history.push(`/${username}`)}>
      <div>
        <img src={Mock} alt="name" />
      </div>
      <div>
        <span>{username}</span>
      </div>
    </Profile>
  );
};

export default ProfileCard;
