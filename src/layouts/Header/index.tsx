import React from 'react';

import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userUnLogged } from '../../features/user/userSlice';
import { userLoggedOut } from '../../features/userChats/userChatsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon,
  faSun,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from 'styled-components';
import { Container, Nav, List, Burguer, Line, Alert, Redirect, User } from './styles';
import Switch from 'react-switch';

import handleMobileMenu from '../../utils/general/handleMobileMenu';

import { Props } from '../../global/types';
import { authentication } from '../../lib';

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState(0);
  const user = useAppSelector(state => state.user.user);
  const chats = useAppSelector(state => state.chats.chats);
  const theme = React.useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const signOut = () => {
    authentication.auth.signOut();
    dispatch(userUnLogged(null));
    dispatch(userLoggedOut(null));
    toast('Succesfully unlogged');
  };

  React.useEffect(() => {
    if (chats && user) {
      let newMessages = 0;
      chats.forEach(chat => {
        chat.messages.forEach(msg => {
          if (!msg.wasViewed && msg.user.id !== user.id) newMessages++;
        });
      });
      setNewMessages(newMessages);
    }
  }, [chats, user]);

  return (
    <Container>
      <div>
        <h2>FireSwift</h2>
      </div>
      <Nav>
        {user && (
          <User>
            <Redirect
              to={{
                pathname: `/${user.name}`,
                state: { id: authentication.auth.currentUser?.uid },
              }}
            >
              <h2>{user.name}</h2>
            </Redirect>
          </User>
        )}
        <Switch
          className="switch"
          onChange={toggleTheme}
          checked={theme.title === 'dark'}
          checkedIcon={<FontAwesomeIcon size="1x" icon={faSun} className="sun" />}
          uncheckedIcon={<FontAwesomeIcon size="1x" icon={faMoon} className="moon" />}
          height={15}
          width={45}
          handleDiameter={20}
          offColor={'#0d1117'}
          onColor={'#f5f5f5'}
        />
        <List isMenuOpen={isMenuOpen}>
          <li
            onClick={() => {
              handleMobileMenu(setIsMenuOpen);
            }}
          >
            <Redirect to="/home">
              <FontAwesomeIcon icon={faHome} />
            </Redirect>
            <div className="ballon">
              <span>Home</span>
            </div>
          </li>
          <li
            onClick={() => {
              handleMobileMenu(setIsMenuOpen);
            }}
          >
            <Redirect to="/chats">
              {user && (
                <Alert>
                  <span>{newMessages}</span>
                </Alert>
              )}
              <FontAwesomeIcon icon={faCommentDots} />
            </Redirect>
            <div className="ballon">
              <span>Chats</span>
            </div>
          </li>
          <li
            onClick={() => {
              handleMobileMenu(setIsMenuOpen);
              user && signOut();
            }}
          >
            <Redirect to="/login">
              <FontAwesomeIcon icon={user ? faSignOutAlt : faSignInAlt} />
            </Redirect>
            {user ? (
              <div className="ballon">
                <span>Logout</span>
              </div>
            ) : (
              <div className="ballon">
                <span>Login</span>
              </div>
            )}
          </li>
        </List>
        <Burguer
          onClick={() => {
            handleMobileMenu(setIsMenuOpen);
          }}
        >
          <Line className="first"></Line>
          <Line className="second"></Line>
          <Line className="third"></Line>
        </Burguer>
      </Nav>
    </Container>
  );
};

export default Header;
