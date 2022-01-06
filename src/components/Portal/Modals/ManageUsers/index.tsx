import React from 'react';

import setGroupOwner from '../../../../utils/setters/setGroupOwner';
import { useAppDispatch } from '../../../../app/hooks';

import { Container, List, CloseModal } from './styles';
import { ModalBG, Author } from '../../../../global/styles';

import DefaultPicture from '../../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Group, GroupUser, ModalsProps } from '../../../../global/types';
import GroupAccess from '../../../../utils/classes/GroupAccess';

interface Props extends ModalsProps {
  group: Group;
  setGroup: (group: Group | null) => void;
  message: string;
}

const ManageUsers: React.FC<Props> = ({ setIsModalVisible, user, group, setGroup, message }) => {
  const dispatch = useAppDispatch();

  const handleClick = async (newOwner: GroupUser) => {
    await setGroupOwner(newOwner, group, setGroup);
    GroupAccess.leave(user, group, dispatch, setGroup);
  };

  return (
    <ModalBG>
      <Container>
        <CloseModal onClick={() => setIsModalVisible(false)}>
          <FontAwesomeIcon size="2x" color="purple" icon={faTimes} />
        </CloseModal>
        <h1>{message}</h1>
        <List>
          {group.users.map(gpUser => {
            if (gpUser.id !== user.id) {
              return (
                <li key={gpUser.id} onClick={() => handleClick(gpUser)}>
                  <Author>
                    <div>
                      <img
                        src={gpUser.picture ? gpUser.picture : DefaultPicture}
                        alt={gpUser.name}
                      />
                    </div>
                    <div className="name">
                      <h2>{gpUser.name}</h2>
                      <small>Role: {gpUser.role}</small>
                    </div>
                  </Author>
                </li>
              );
            } else return null;
          })}
        </List>
      </Container>
    </ModalBG>
  );
};

export default ManageUsers;
