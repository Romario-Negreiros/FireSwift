import React from 'react';

import { Container, Message } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  message: string;
}

const Exception: React.FC<Props> = ({ message }) => {
  return (
    <Container>
      <FontAwesomeIcon size="3x" color="red" icon={faTimesCircle} />
      <Message>{message}</Message>
    </Container>
  );
};

export default Exception;