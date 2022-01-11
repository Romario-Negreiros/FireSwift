import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { useHistory } from 'react-router-dom';

import { ChatsList, CurrentChat, Exception } from '../../components';
import { Grid } from './styles';
import { CenteredContainer } from '../../global/styles';

import { User } from '../../global/types';

interface State {
  chatID: string;
}

const Chats: React.FC = () => {
  const [error, setError] = React.useState('');
  const [currentChat, setCurrentChat] = React.useState('');
  const user = useAppSelector(state => state.user.user);
  const chats = useAppSelector(state => state.chats.chats);

  const {
    location: { state },
  } = useHistory<State>();

  React.useEffect(() => {
    if (user) {
      if (user.chats.length) {
        if (state) setCurrentChat(state.chatID);
      } else setError("You haven't created any chats yet!");
    } else setError('You need to be logged in to use chats!');
  }, [user, state]);

  if (error) {
    return (
      <CenteredContainer>
        <Exception message={error} />
      </CenteredContainer>
    );
  } else if (!chats?.length || !chats) {
    return (
      <CenteredContainer>
        <Exception message={"You haven't created any chats yet!"} />
      </CenteredContainer>
    );
  }
  return (
    <Grid>
      <ChatsList chats={chats} setCurrentChat={setCurrentChat} currentUser={user as User} />
      <CurrentChat currentChat={currentChat} chats={chats} currentUser={user as User} />
    </Grid>
  );
};

export default Chats;
