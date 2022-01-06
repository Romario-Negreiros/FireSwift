import React from 'react';

import { useHistory } from 'react-router-dom';
import { firestoredb } from '../../lib';
import handleFirebaseError from '../../utils/general/handleFirebaseError';

import { Grid, Title, View, ManagingOptions } from './styles';
import { CenteredContainer } from '../../global/styles';
import { Loader, Exception, PostRequests } from '../../components';

import { Group } from '../../global/types';

interface State {
  id: string;
}

const GroupAdmPanel: React.FC = () => {
  const [group, setGroup] = React.useState<Group | null>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState('');
  const [view, setView] = React.useState('');

  const changeView = () => {
    if (group) {
      switch (view) {
        case 'Post requests':
          return <PostRequests group={group} setGroup={setGroup} />;
      }
    }
  };

  const {
    location: { state },
  } = useHistory<State>();

  React.useEffect(() => {
    if (state) {
      (async () => {
        try {
          const groupRef = firestoredb.doc(firestoredb.db, 'groups', state.id);
          const groupSnap = await firestoredb.getDoc(groupRef);
          if (groupSnap.exists()) {
            const group = groupSnap.data() as Group;
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
      setIsLoaded(true);
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
    <Grid>
      <Title>Group's administration panel</Title>
      <ManagingOptions>
        <li onClick={() => setView('Post requests')}>
          <p>Post requests</p>
          <p className="total">{group.requests.postsToPublish.length} requests</p>
        </li>
        <li>
          <p>User requests</p>
          <p className="total">{group.requests.usersToJoin.length} requests</p>
        </li>
        <li>
          <p>Manage users</p>
          <p className="total">{group.users.length} users</p>
        </li>
        <li>
          <p>Change group access</p>
          <p className="total">Group is currently {group.private ? 'private' : 'not private'}</p>
        </li>
      </ManagingOptions>
      <View>
        <h2>{view}</h2>
        {changeView()}
      </View>
    </Grid>
  );
};

export default GroupAdmPanel;
