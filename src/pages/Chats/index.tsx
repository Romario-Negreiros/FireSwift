import React from 'react';

import { ChatsList, CurrentChat } from '../../components';
import { Grid } from './styles';

const Chats: React.FC = () => {
  return (
    <Grid>
      <ChatsList />
      <CurrentChat />
    </Grid>
  );
};

export default Chats;
