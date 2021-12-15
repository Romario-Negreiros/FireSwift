import React from 'react';

import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { useAppSelector } from '../../app/hooks';
import { useHistory } from 'react-router-dom';

import { firestoredb } from '../../lib';
import { ChatsList, CurrentChat, Loader, Exception } from '../../components';
import { Grid } from './styles';
import { CenteredContainer } from '../../global/styles';

import { Chat } from '../../global/types';

interface State {
  chatID: string;
}

const Chats: React.FC = () => {
  const [userChats, setUserChats] = React.useState<Chat[]>([]);
  const user = useAppSelector(state => state.user.user);
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [currentChatID, setCurrentChatID] = React.useState('');
  const {
    location: { state },
  } = useHistory<State>();

  React.useEffect(() => {
    if (user) {
      if (user.chats.length) {
        (async () => {
          try {
            const userChatsIDS = user.chats.map(chat => chat.chatID);
            const chatsQuery = firestoredb.query(
              firestoredb.collection(firestoredb.db, 'chats'),
              firestoredb.where('chatID', 'in', userChatsIDS)
            );
            const userChats: Chat[] = [];
            const chatsSnapshot = await firestoredb.getDocs(chatsQuery);
            chatsSnapshot.forEach(chat => {
              if (chat.exists()) {
                const chatData = chat.data() as Chat;
                userChats.push(chatData);
              }
            });
            setUserChats(userChats);
            if (state) {
              setCurrentChatID(state.chatID);
            }
          } catch (err) {
            handleFirebaseError(err, setError);
          } finally {
            setIsLoaded(true);
          }
        })();
      } else setError('You have no chats opened yet!');
    } else setError('You need to be logged in to use chats!');
  }, [user, state]);

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
  } else if (!user) {
    return (
      <CenteredContainer>
        <Exception message={'You need to be logged in to use chats!'} />
      </CenteredContainer>
    );
  }
  return (
    <Grid>
      <ChatsList userChats={userChats} setCurrentChatID={setCurrentChatID} currentUser={user} />
      <CurrentChat userChats={userChats} currentChatID={currentChatID} currentUser={user} />
    </Grid>
  );
};

export default Chats;
