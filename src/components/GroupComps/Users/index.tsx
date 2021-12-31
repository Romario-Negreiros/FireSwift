import React from 'react';

import { Author, CustomIconBox, Options } from '../../../global/styles';
import { Container, List } from './styles';

import MockUser from '../../../assets/default-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

import { Group } from '../../../global/types';

interface Props {
  users: Group['users'];
}

const Users: React.FC<Props> = ({ users }) => {
  return (
    <Container>
      <List>
        {new Array(10).fill(1).map((_, i) => (
          <li key={i}>
            <Author>
              <div>
                <img src={MockUser} alt="user name" />
              </div>
              <div className="name">
                <h2>user freaking name</h2>
                <small>since: 14/12/2004</small>
              </div>
            </Author>
            <Options>
              <CustomIconBox>
                <FontAwesomeIcon icon={faUser} color="purple" size="2x" />
              </CustomIconBox>
              <CustomIconBox>
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
