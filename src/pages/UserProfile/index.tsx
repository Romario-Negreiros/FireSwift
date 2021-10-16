import React from 'react';

import { useParams } from 'react-router-dom';

import { Container, Manage, Picture, UserBio, UserInfo, Friends } from './styles';
import FakePicture from '../../assets/mock-profile.jpg';
import { FriendsList } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Params {
  username: string;
}

const UserProfile: React.FC = () => {
  const { username } = useParams<Params>();

  return (
    <Container>
      <Picture>
        <img src={FakePicture} alt={username} />
        <h1>{username}</h1>
      </Picture>
      <Manage>
        <span>Add friend</span>
        <FontAwesomeIcon size="2x" color="purple" icon={faCheck} />
      </Manage>
      <UserBio>
        <p>Addiiiiiiieu baaaaaa arrrrrriii babababababba</p>
      </UserBio>
      <UserInfo>
        <li>
          <h2>Age</h2>
          <span>18</span>
        </li>
        <li>
          <h2>Relationship</h2>
          <span>Single</span>
        </li>
        <li>
          <h2>Country</h2>
          <span>Argelia</span>
        </li>
        <li>
          <h2>Languages</h2>
          <span>French</span>
        </li>
        <li>
          <h2>Tastes</h2>
          <span>Music, sports</span>
        </li>
      </UserInfo>
      <Friends>
        <h2>Friends</h2>
        <FriendsList />
      </Friends>
    </Container>
  );
};

export default UserProfile;
