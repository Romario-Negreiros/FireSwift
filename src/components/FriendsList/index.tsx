import React from 'react';

import { useHistory } from 'react-router';

import { Container, Profile } from './styles';

import Mock from '../../assets/mock-profile.jpg';

const FriendsList: React.FC = () => {
  const history = useHistory();
  const username = 'Yoooo Yaaaa Souza';

  return (
    <Container>
      <ul>
        {[1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1].map(() => (
          <Profile
            key={Math.ceil(Math.random() * 456578)}
            onClick={() => history.push(`/${username}`)}
          >
            <div>
              <img src={Mock} alt="name" />
            </div>
            <div>
              <span>{username}</span>
            </div>
          </Profile>
        ))}
      </ul>
    </Container>
  );
};

export default FriendsList;
