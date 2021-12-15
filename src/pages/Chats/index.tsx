import React from 'react';

import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { useAppSelector } from '../../app/hooks';

import { firestoredb } from '../../lib';
import { ChatsList, CurrentChat, Loader, Exception } from '../../components';
import { Grid } from './styles';
import { CenteredContainer } from '../../global/styles';

// import { Chat } from '../../global/types';

const Chats: React.FC = () => {
  // const [userChats, setUserChats] = React.useState<Chat[]>([]);
  const user = useAppSelector(state => state.user.user);
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      if (user.chats.length) {
        (async () => {
          try {
            const userChats = user.chats.map(chat => chat.chatID);
            const chatsQuery = firestoredb.query(
              firestoredb.collection(firestoredb.db, 'chats'),
              firestoredb.where('chatID', 'in', userChats)
            );
            const chatsSnapshot = await firestoredb.getDocs(chatsQuery);
            chatsSnapshot.forEach(chat => {
              console.log(chat);
            });
          } catch (err) {
            handleFirebaseError(err, setError);
          } finally {
            setIsLoaded(true);
          }
        })();
      } else setError('You have no chats opened yet!');
    } else setError('You need to be logged in to use chats!');
  }, [user]);

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
  }
  return (
    <Grid>
      <ChatsList />
      <CurrentChat />
    </Grid>
  );
};

export default Chats;
