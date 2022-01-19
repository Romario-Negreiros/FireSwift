import React from 'react';

import handleFirebaseError from '../../utils/general/handleFirebaseError';
import checkTime from '../../utils/general/checkTime';
import { firestoredb } from '../../lib';
import { useHistory } from 'react-router-dom';

import { Author, InnerCenteredContainer } from '../../global/styles';
import { Container, Notification, CloseNotis } from './styles';
import { Exception } from '..';

import DefaultPicture from '../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

import { User, Notification as NotiType } from '../../global/types';

interface Props {
  setShowNotis: (showNotis: boolean) => void;
  user: User;
}

const Notifications: React.FC<Props> = ({ setShowNotis, user }) => {
  const history = useHistory();

  const deleteNotification = async (notification: NotiType) => {
    try {
      const userCopy: User = JSON.parse(JSON.stringify(user));
      const notiIndex = userCopy.notifications.findIndex(not => not.id === notification.id);
      userCopy.notifications.splice(notiIndex, 1);
      await firestoredb.updateDoc(firestoredb.doc(firestoredb.db, 'users', user.id), {
        notifications: userCopy.notifications,
      });
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleClick = (notification: NotiType) => {
    if (notification.post) {
      if (history.location.pathname === '/home') {
        history.push('/fallback');
        setTimeout(() => {
          history.push({
            pathname: '/home',
            state: {
              post: notification.post,
            },
          });
        }, 100);
      } else {
        history.push({
          pathname: '/home',
          state: {
            post: notification.post,
          },
        });
      }
    } else if (notification.group) {
      history.push({
        pathname: `/groups/${notification.group.name}`,
        state: {
          id: notification.group.id,
        },
      });
    } else if (notification.chatID) {
      history.push({
        pathname: '/chats',
        state: {
          chatID: notification.chatID,
        },
      });
    } else {
      history.push({
        pathname: `/username/${notification.sentBy.name}`,
        state: {
          id: notification.sentBy.id,
        },
      });
    }
    setShowNotis(false);
  };

  React.useEffect(() => {
    const userCopy: User = JSON.parse(JSON.stringify(user));
    userCopy.notifications.forEach(not => {
      if (!not.wasViewed) not.wasViewed = true;
    });
    firestoredb.updateDoc(firestoredb.doc(firestoredb.db, 'users', user.id), {
      notifications: userCopy.notifications,
    });
  });

  if (user) {
    return (
      <Container>
        <CloseNotis onClick={() => setShowNotis(false)}>
          <FontAwesomeIcon icon={faTimes} color="purple" size="2x" />
        </CloseNotis>
        <ul>
          {user.notifications.length ? (
            user.notifications.map(not => (
              <Notification key={not.id} onClick={() => handleClick(not)}>
                <Author>
                  <div>
                    <img
                      src={not.sentBy.picture ? not.sentBy.picture : DefaultPicture}
                      alt={not.sentBy.name}
                    />
                  </div>
                  <div className="name">
                    <h2>{not.sentBy.name}</h2>
                  </div>
                </Author>

                <p>{not.message}</p>

                <div className="delete" onClick={() => deleteNotification(not)}>
                  <FontAwesomeIcon icon={faTrash} color="red" size="2x" />
                </div>

                <div className="time">
                  <span>{checkTime(not.sentAt)}</span>
                </div>
              </Notification>
            ))
          ) : (
            <li>
              <InnerCenteredContainer>
                <Exception message="No notifications to see" />
              </InnerCenteredContainer>
              <br />
            </li>
          )}
        </ul>
      </Container>
    );
  } else
    return (
      <Container>
        <CloseNotis onClick={() => setShowNotis(false)}>
          <FontAwesomeIcon icon={faTimes} color="purple" size="2x" />
        </CloseNotis>
        <ul>
          <li>
            <InnerCenteredContainer>
              <Exception message="No user connected" />
            </InnerCenteredContainer>
          </li>
        </ul>
      </Container>
    );
};

export default Notifications;
