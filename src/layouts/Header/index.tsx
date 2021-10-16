import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faHome, faCoffee, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from 'styled-components';
import { Container, Nav, List, Burguer, Line, Alert, Redirect } from './styles';
import Switch from 'react-switch';

import handleMobileMenu from '../../utils/handleMobileMenu';

import { Props } from '../../global/types';

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const theme = React.useContext(ThemeContext);

  return (
    <Container>
      <div>
        <img src="" alt="" />
        <h2>FireSwift</h2>
      </div>
      <Nav>
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
              <Alert>
                <span>99+</span>
              </Alert>
              <FontAwesomeIcon icon={faCoffee} />
            </Redirect>
            <div className="ballon">
              <span>Chats</span>
            </div>
          </li>
          <li
            onClick={() => {
              handleMobileMenu(setIsMenuOpen);
            }}
          >
            <Redirect to="/login">
              <FontAwesomeIcon icon={faSignInAlt} />
            </Redirect>
            <div className="ballon">
              <span>Login</span>
            </div>
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
