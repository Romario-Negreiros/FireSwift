import React from 'react';

import FakePicture from '../../assets/mock-profile.jpg';

import { Container, DropdownButton, List, User, Message } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';

const ChatsList: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Chats list</span>
        <FontAwesomeIcon color="white" size="1x" icon={faArrowDown} />
      </DropdownButton>
      <List isDropdownOpen={isDropdownOpen}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
          <li key={Math.ceil(Math.random() * 54654681)}>
            <User>
              <img src={FakePicture} alt="username" />
              <span>Yooohan uuuus</span>
            </User>
            <Message>
              <span>Last message</span>
              <div className="status">
                <FontAwesomeIcon color="purple" icon={faCheck} />
                {/*
                  No icon > being sent
                  Icon no bg > sent not received
                  Icon and lighter bg > sent and received
                  Icon and darker bg > sent, received and read
                */}
              </div>
            </Message>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default ChatsList;
