import React from 'react';

import { Container, Presentation } from './styles';
import { Posts, About, Users } from '../../components';

import MockBg from '../../assets/mock-post.jpg';

const Group: React.FC = () => {
  const [currentComponent, setCurrentComponent] = React.useState('');

  const changeComponent = () => {
    switch (currentComponent) {
      case 'Posts':
        return <Posts />;
      case 'About':
        return <About />;
      case 'Users':
        return <Users />;
    }
  };

  return (
    <>
      <Container>
        <Presentation>
          <li className="bgImg">
            <img src={MockBg} alt="group name" />
          </li>
          <li className="info">
            <h1>group big name</h1>
            <p>
              group big big very big description or bio or anything you want to call it group big
              big very big description or bio or anything you want to call itgroup big big very big
              description or bio or anything you want to call it group big big very big description
              or bio or anything you want to call it
            </p>
          </li>
          <li className="options">
            <ul>
              <li onClick={() => setCurrentComponent('Posts')}>Posts</li>
              <li onClick={() => setCurrentComponent('About')}>About</li>
              <li onClick={() => setCurrentComponent('Users')}>Users</li>
            </ul>
          </li>
        </Presentation>
        <h2>{currentComponent}</h2>
        {changeComponent()}
      </Container>
    </>
  );
};

export default Group;
