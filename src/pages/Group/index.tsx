import React from 'react';

import { useHistory } from 'react-router-dom';
import { firestoredb } from '../../lib';
import handleFirebaseError from '../../utils/general/handleFirebaseError';

import { Container, Presentation } from './styles';
import { Posts, About, Users, Loader, Exception } from '../../components';
import { CenteredContainer } from '../../global/styles';

import DefaultBg from '../../assets/mock-post.jpg';

import { Group as GroupType } from '../../global/types';

interface State {
  id: string;
}

const Group: React.FC = () => {
  const [currentComponent, setCurrentComponent] = React.useState('');
  const [error, setError] = React.useState('');
  const [group, setGroup] = React.useState<GroupType | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const {
    location: { state },
  } = useHistory<State>();

  const changeComponent = () => {
    if (group) {
      switch (currentComponent) {
        case 'Posts':
          return <Posts groupID={group.id} />;
        case 'About':
          return <About group={group} />;
        case 'Users':
          return <Users users={group.users} />;
        default:
          return <Posts groupID={group.id} />;
      }
    }
  };

  React.useEffect(() => {
    if (state) {
      (async () => {
        try {
          const groupRef = firestoredb.doc(firestoredb.db, 'groups', state.id);
          const groupSnap = await firestoredb.getDoc(groupRef);
          if (groupSnap.exists()) {
            const group = groupSnap.data() as GroupType;
            setGroup(group);
          } else {
            setError("This group doesn't exist!");
          }
        } catch (err) {
          handleFirebaseError(err, setError);
        } finally {
          setIsLoaded(true);
        }
      })();
    } else {
      setError('Something went wrong!');
    }
  }, [state]);

  if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  } else if (error) {
    return (
      <CenteredContainer>
        <Exception message={error} />
      </CenteredContainer>
    );
  } else if (!group) {
    return (
      <CenteredContainer>
        <Exception message="This group doesn't exist!" />
      </CenteredContainer>
    );
  }
  return (
    <>
      <Container>
        <Presentation>
          <li className="bgImg">
            <img src={group.bgImg ? group.bgImg : DefaultBg} alt={group.name} />
          </li>
          <li className="info">
            <h1>{group.name}</h1>
            <p>{group.desc}</p>
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
