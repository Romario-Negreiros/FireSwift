import React from 'react';

import { useHistory } from 'react-router-dom';
import { firestoredb } from '../../lib';
import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import GroupAccess from '../../utils/classes/GroupAccess';

import { Container, Presentation } from './styles';
import { Posts, About, Users, Loader, Exception, CreatePost, Portal } from '../../components';
import { ManageUsers } from '../../components/Portal/Modals';
import { CenteredContainer } from '../../global/styles';

import DefaultBg from '../../assets/mock-post.jpg';

import { Group as GroupType, User } from '../../global/types';
import { toast } from 'react-toastify';

interface State {
  id: string;
}

const Group: React.FC = () => {
  const [currentComponent, setCurrentComponent] = React.useState('');
  const [error, setError] = React.useState('');
  const [group, setGroup] = React.useState<GroupType | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
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
        case 'Create post':
          return <CreatePost user={user as User} pathSegment="groups" group={group} />;
      }
    }
  };

  const handleLeaveOrJoin = () => {
    if (user) {
      if (group) {
        if (!user.groups.some(uGroup => uGroup.id === group.id)) {
          GroupAccess.join(user, group, dispatch, setError, setGroup);
        } else {
          if (group.owner.id === user.id) {
            setIsModalVisible(true);
          } else {
            GroupAccess.leave(user, group, dispatch, setError, setGroup);
          }
        }
      }
    } else toast.error('You need to be logged in to complete this action!');
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
            <img src={group.picture ? group.picture : DefaultBg} alt={group.name} />
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
              {user && (
                <li
                  onClick={() => {
                    if (!user?.groups.some(uGroup => uGroup.id === group.id)) {
                      toast.error('You need to join the group in order to create posts!');
                      return;
                    }
                    setCurrentComponent('Create post');
                  }}
                >
                  Create post
                </li>
              )}
              <li onClick={handleLeaveOrJoin}>
                {!user?.groups.some(uGroup => uGroup.id === group.id)
                  ? 'Join group'
                  : 'Leave group'}
              </li>
            </ul>
          </li>
        </Presentation>
        <h2>{currentComponent}</h2>
        <br />
        {changeComponent()}
      </Container>
      {isModalVisible && (
        <Portal>
          <ManageUsers setIsModalVisible={setIsModalVisible} user={user as User} group={group} />
        </Portal>
      )}
    </>
  );
};

export default Group;
