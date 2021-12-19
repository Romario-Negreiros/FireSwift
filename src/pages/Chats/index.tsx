import React from 'react';

import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { useAppSelector } from '../../app/hooks';
import { useHistory } from 'react-router-dom';
import { realtimedb } from '../../lib';

import { ChatsList, CurrentChat, Exception, Loader } from '../../components';
import { Grid } from './styles';
import { CenteredContainer } from '../../global/styles';

import { Chat, User } from '../../global/types';

interface State {
  chatID: string;
}

const Chats: React.FC = () => {
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = React.useState('');
  const user = useAppSelector(state => state.user.user);
  const {
    location: { state },
  } = useHistory<State>();

  React.useEffect(() => {
    if (user) {
      if (user.chats.length) {
        (async () => {
          try {
            const chatsRef = realtimedb.dbRef(realtimedb.db, 'chats');
            realtimedb.onValue(chatsRef, snapshot => {
              if (snapshot.exists()) {
                const allChats = Object.values(snapshot.val()) as Chat[];
                const userChats: Chat[] = allChats.filter(chat => {
                  if (user.chats.some(userChat => userChat.id === chat.id)) {
                    return chat;
                  } else return null;
                });
                userChats.forEach(userChat => {
                  if (!userChat.messages) userChat['messages'] = [];
                });
                setChats(userChats);
              }
            });
          } catch (err) {
            handleFirebaseError(err, setError);
          } finally {
            setIsLoaded(true);
          }
        })();
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
  } else if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }
  return (
    <Grid>
      <ChatsList chats={chats} setCurrentChat={setCurrentChat} currentUserID={user?.id as string} />
      <CurrentChat currentChat={currentChat} chats={chats} currentUser={user as User} />
    </Grid>
  );
};

export default Chats;
