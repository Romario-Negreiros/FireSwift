import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { Container, Options, View, DefaultView } from './styles';
import { CreateGroup, CreatePost, CreateStory, Exception } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faPaw, faTable } from '@fortawesome/free-solid-svg-icons';
import { CenteredContainer } from '../../global/styles';

const Create: React.FC = () => {
  const [currentComponent, setCurrentComponent] = React.useState('');
  const user = useAppSelector(state => state.user.user);

  const changeComponent = () => {
    if (user) {
      switch (currentComponent) {
        case 'New group':
          return <CreateGroup />;
        case 'New post':
          return <CreatePost user={user} pathSegment="users" />;
        case 'New story':
          return <CreateStory />;
        default:
          return <DefaultView />;
      }
    } 
  };
  if(!user) {
    return (
      <CenteredContainer>
        <Exception message={"You need to be logged in to create something!"}/>
      </CenteredContainer>
    )
  }
  return (
    <Container>
      <h1>Create</h1>
      <Options>
        <section onClick={() => setCurrentComponent('New group')}>
          <p>New group</p>
          <div>
            <FontAwesomeIcon size="2x" icon={faPaw} color="purple" />
          </div>
        </section>
        <section onClick={() => setCurrentComponent('New post')}>
          <p>New post</p>
          <div>
            <FontAwesomeIcon size="2x" icon={faTable} color="purple" />
          </div>
        </section>
        <section onClick={() => setCurrentComponent('New story')}>
          <p>New story</p>
          <div>
            <FontAwesomeIcon size="2x" icon={faGlassCheers} color="purple" />
          </div>
        </section>
      </Options>
      <View>
        <h2>{currentComponent}</h2>
        {changeComponent()}
      </View>
    </Container>
  );
};

export default Create;
