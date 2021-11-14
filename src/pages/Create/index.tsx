import React from 'react';

import { Container, Options, View, DefaultView } from './styles';
import { CreateGroup, CreatePost, CreateStory } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faPaw, faTable } from '@fortawesome/free-solid-svg-icons';

const Create: React.FC = () => {
  const [currentComponent, setCurrentComponent] = React.useState('newgroup');

  return (
    <Container>
      <h1>Create</h1>
      <Options>
        <section onClick={() => setCurrentComponent('newgroup')}>
          <p>New group</p>
          <div>
            <FontAwesomeIcon size="2x" icon={faPaw} color="purple" />
          </div>
        </section>
        <section onClick={() => setCurrentComponent('newpost')}>
          <p>New post</p>
          <div>
            <FontAwesomeIcon size="2x" icon={faTable} color="purple" />
          </div>
        </section>
        <section onClick={() => setCurrentComponent('newstory')}>
          <p>New story</p>
          <div>
            <FontAwesomeIcon size="2x" icon={faGlassCheers} color="purple" />
          </div>
        </section>
      </Options>
      <View>
        <h2>{currentComponent}</h2>
        {() => {
          switch (currentComponent) {
            case 'newgroup':
              return <CreateGroup />;
            case 'newpost':
              return <CreatePost />;
            case 'newstory':
              return <CreateStory />;
            default:
              return <DefaultView />;
          }
        }}
      </View>
    </Container>
  );
};

export default Create;
