import React from 'react';

import usePersistedState from './utils/hooks/usePersistedState';
import { realtimedb, authentication, firestoredb } from './lib';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loggedUserChats } from './features/userChats/userChatsSlice';
import { userLogged, updateUser } from './features/user/userSlice';

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

import { Chat, User as UserStateType } from './global/types';
import { User } from '@firebase/auth';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);
  const dispatch = useAppDispatch();
  const userConnected = useAppSelector(state => state.user.user);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  const CloseButton: React.FC = () => {
    return <FontAwesomeIcon color="#fff" icon={faTimes} />;
  };

  React.useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(authentication.auth, async user => {
      if (user) {
        const { uid } = authentication.auth.currentUser as User;
        const userRef = firestoredb.doc(firestoredb.db, 'users', uid);
        const userSnap = await firestoredb.getDoc(userRef);
        if (userSnap.exists()) {
          const user = userSnap.data() as Omit<UserStateType, 'id'>;
          const id = userSnap.id;
          dispatch(userLogged({ id, ...user }));
          firestoredb.onSnapshot(userRef, doc => {
            const docData = doc.data() as Omit<UserStateType, 'id'>;
            if (
              docData.chats.length !== userConnected?.chats.length ||
              docData.notifications.length !== userConnected?.chats.length
            ) {
              dispatch(updateUser({ id: doc.id, ...docData }));
            }
          });
        }
      }
    });

    return () => unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (userConnected) {
      const chatsRef = realtimedb.dbRef(realtimedb.db, 'chats');
      realtimedb.onValue(chatsRef, snapshot => {
        if (snapshot.exists()) {
          const allChats = Object.values(snapshot.val()) as Chat[];
          const userChats: Chat[] = allChats.filter(chat => {
            if (userConnected.chats.some(userChat => userChat.id === chat.id)) {
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
  }, [userConnected, dispatch]);

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
