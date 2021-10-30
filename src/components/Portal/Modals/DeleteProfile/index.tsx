import React from 'react';

import { ModalBG } from '../../../../global/styles';

interface Props {
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const DeleteProfile: React.FC<Props> = ({ setIsModalVisible }) => {
  return <ModalBG></ModalBG>;
};

export default DeleteProfile;
