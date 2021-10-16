import React from 'react';
import { FriendsList, Feed } from '../../components';

import { Grid } from './styles';

const Home: React.FC = () => {
  return (
    <Grid>
      <FriendsList />
      <Feed />
    </Grid>
  );
};

export default Home;
