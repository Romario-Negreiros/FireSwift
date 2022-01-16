import React from 'react';

import { useHistory } from 'react-router-dom';

import { FriendsList, Feed, SocialOptions } from '../../components';

import { Grid } from './styles';

interface State {
  post: {
    id: string;
    pathSegment: string;
    commentID?: string;
    replyID?: string;
  }
}

const Home: React.FC = () => {
  const { location: { state } } = useHistory<State>();

  return (
    <Grid>
      <SocialOptions />
      <FriendsList />
      <Feed postFromNotification={state ? state.post : undefined} />
    </Grid>
  );
};

export default Home;
