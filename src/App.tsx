import React from 'react';

import usePersistedState from './utils/hooks/usePersistedState';
import { realtimedb } from './lib';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loggedUserChats } from './features/userChats/userChatsSlice';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';
import light from './styles/light';
import dark from './styles/dark';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Layout from './layouts';
import Pages from './pages';
import Reset from './styles/reset';

import { Chat } from './global/types';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  const CloseButton: React.FC = () => {
    return <FontAwesomeIcon color="#fff" icon={faTimes} />;
  };

  React.useEffect(() => {
    if (user) {
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
          if (userChats.length) dispatch(loggedUserChats(userChats));
        }
      });
    }
  }, [user, dispatch]);

  return (
    <ThemeProvider theme={theme}>
        <Reset />
        <Layout toggleTheme={toggleTheme}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop={true}
            closeButton={<CloseButton />}
          />
          <Pages />
        </Layout>
    </ThemeProvider>
  );
};

export default App;
