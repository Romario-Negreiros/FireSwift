import React from 'react';

import { Container, List } from './styles';
import { ModalBG, Author, CloseModal } from '../../../../global/styles';

import DefaultPicture from '../../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Group, ModalsProps } from '../../../../global/types';

interface Props extends ModalsProps {
  group: Group;
}

const ManageUsers: React.FC<Props> = ({ setIsModalVisible, user, group }) => {
  return (
    <ModalBG>
      <Container>
        <CloseModal onClick={() => setIsModalVisible(false)}>
          <FontAwesomeIcon size="2x" color="purple" icon={faTimes} />
        </CloseModal>
        <List>
          {group.users.map(gpUser => (
            <li key={gpUser.id}>
              <Author>
                <div>
                  <img src={user.picture ? user.picture : DefaultPicture} alt={user.name} />
                </div>
              </Author>
            </li>
          ))}
        </List>
      </Container>
    </ModalBG>
  );
};

export default ManageUsers;
