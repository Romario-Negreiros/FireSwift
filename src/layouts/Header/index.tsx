import React from 'react';

import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userUnLogged } from '../../features/user/userSlice';
import { authentication } from '../../lib';
import handleMobileMenu from '../../utils/general/handleMobileMenu';
import { userLoggedOut } from '../../features/userChats/userChatsSlice';

import Notifications from '../../components/Notifications';
import { ThemeContext } from 'styled-components';
import { Container, Nav, List, Burguer, Line, Redirect, User } from './styles';
import { Alert } from '../../global/styles';
import Switch from 'react-switch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon,
  faSun,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faCommentDots,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

import { Props, User as UserType } from '../../global/types';

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState(0);
  const [newNotis, setNewNotis] = React.useState(0);
  const [showNotis, setShowNotis] = React.useState(false);
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
    if (user) {
      let newMessages = 0;
      let newNotis = 0;
      if (chats) {
        chats.forEach(chat => {
          chat.messages.forEach(msg => {
            if (!msg.wasViewed && msg.user.id !== user.id) newMessages++;
          });
        });
      }
      user.notifications.forEach(not => {
        if (!not.wasViewed) newNotis++;
      });
      setNewMessages(newMessages);
      setNewNotis(newNotis);
    }
  }, [chats, user]);

  return (
    <Container>
      {showNotis && (
        <Notifications
          setShowNotis={setShowNotis}
          notifications={user?.notifications as UserType['notifications']}
          user={user as UserType}
        />
      )}
      <div>
        <h2>FireSwift</h2>
      </div>
      <Nav>
        {user && (
          <User>
            <Redirect
              to={{
                pathname: `/users/${user.name}`,
                state: { id: user.id },
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
          {user && (
            <li
              className="noti"
              onClick={() => {
                handleMobileMenu(setIsMenuOpen);
                setShowNotis(!showNotis);
              }}
            >
              <Alert position="10px">
                <span>{newNotis}</span>
              </Alert>
              <FontAwesomeIcon icon={faBell} />
              <div className="ballon">
                <span>Notifications</span>
              </div>
            </li>
          )}
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
