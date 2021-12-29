import React from 'react';

import { realtimedb } from '../../lib';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { loggedUserChats } from '../../features/userChats/userChatsSlice';

import { FriendsList, Feed, SocialOptions } from '../../components';

import { Grid } from './styles';

import { Chat } from '../../global/types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  React.useEffect(() => {
    if (user) {
      const chatsRef = realtimedb.dbRef(realtimedb.db, 'chats');
      realtimedb.onValue(chatsRef, snapshot => {
        if (snapshot.exists()) {
          console.log(user);
          const allChats = Object.values(snapshot.val()) as Chat[];
          const userChats: Chat[] = allChats.filter(chat => {
            if (user.chats.some(userChat => userChat.id === chat.id)) {
              return chat;
            } else return null;
          });
          userChats.forEach(userChat => {
            if (!userChat.messages) userChat['messages'] = [];
          });
          if (userChats.length) dispatch(loggedUserChats(userChats));
        }
      });
    }
  }, [user, dispatch]);
  return (
    <Grid>
      <SocialOptions />
      <FriendsList />
      <Feed />
    </Grid>
  );
};

export default Home;
