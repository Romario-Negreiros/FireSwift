import React from 'react';
import { FriendsList, Feed, SocialOptions } from '../../components';

import { Grid } from './styles';

const Home: React.FC = () => {
  return (
    <Grid>
      <SocialOptions />
      <FriendsList />
      <Feed />
    </Grid>
  );
};

export default Home;
