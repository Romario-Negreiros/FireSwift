import React from 'react';

import { useHistory } from 'react-router-dom';
import handleFirebaseError from '../../../utils/general/handleFirebaseError';
// import { firestoredb } from '../../../lib';

import { Container, Options as ButtonsWrapper } from '../PostRequests/styles';
import { Author, Options, CustomIconBox, InnerCenteredContainer } from '../../../global/styles';
import { Exception } from '../..';
import { User } from './styles';

import DefaultPicture from '../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Group, GroupUser } from '../../../global/types';

interface Props {
  group: Group;
  setGroup: (group: Group | null) => void;
}

const UserRequests: React.FC<Props> = ({ group, setGroup }) => {
  const history = useHistory();

  const refuseUser = async (user: GroupUser) => {
    try {
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const acceptUser = async (user: GroupUser) => {
    try {
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  if (!group.requests.usersToJoin.length) {
    return (
      <InnerCenteredContainer>
        <Exception message={'No user requests to see!'} />
      </InnerCenteredContainer>
    );
  }
  return (
    <Container>
      {group.requests.usersToJoin.map(user => (
        <User key={user.id}>
          <div className="upDiv">
            <Author>
              <div>
                <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
              </div>
              <div className="name">
                <h2>{user.name}</h2>
              </div>
            </Author>
            <Options
              onClick={() =>
                history.push({
                  pathname: `users/${user.name}`,
                  state: {
                    id: user.id,
                  },
                })
              }
            >
              <CustomIconBox>
                <FontAwesomeIcon icon={faUser} color="purple" size="2x" />
              </CustomIconBox>
            </Options>
          </div>
          <ButtonsWrapper>
            <button className="refuse" onClick={() => refuseUser(user)}>
              Refuse post
            </button>
            <button className="accept" onClick={() => acceptUser(user)}>
              Accept post
            </button>
          </ButtonsWrapper>
        </User>
      ))}
    </Container>
  );
};

export default UserRequests;
