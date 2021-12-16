import React from 'react';

import { Container, DropdownButton, List, User, Message } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';

import DefaultPicture from '../../assets/default-picture.png';


const ChatsList: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Chats list</span>
        <FontAwesomeIcon color="white" size="1x" icon={faArrowDown} />
      </DropdownButton>
      <List isDropdownOpen={isDropdownOpen}>
      <li>
                  <User>
                    <img
                      src={DefaultPicture}
                      alt="as"
                    />
                    <span>as</span>
                  </User>
                  <Message>
                    <span>qw</span>
                    <div className="status">
                     
                        <FontAwesomeIcon color="purple" size="2x" icon={faCheck} />
                      
                    </div>
                  </Message>
                </li>
      </List>
    </Container>
  );
};

export default ChatsList;
