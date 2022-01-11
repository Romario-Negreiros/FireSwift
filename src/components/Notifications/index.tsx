import React from 'react';

import handleFirebaseError from '../../utils/general/handleFirebaseError';
import handleError from '../../utils/general/handleError';
import { firestoredb } from '../../lib';

import { Author, InnerCenteredContainer } from '../../global/styles';
import { Container, Notification, CloseNotis } from './styles';
import { Exception } from '..';

import DefaultPicture from '../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

import { User, Notification as NotiType } from '../../global/types';

interface Props {
  setShowNotis: (showNotis: boolean) => void;
  notifications: User['notifications'];
  user: User;
}

const Notifications: React.FC<Props> = ({ setShowNotis, notifications, user }) => {
  React.useEffect(() => {
    notifications.forEach((not, i) => {
      if (!not.wasViewed) {
        (async () => {
          try {
            const notCopy: NotiType = JSON.parse(JSON.stringify(not));
            notCopy.wasViewed = true;
            const notificationsCopy: NotiType[] = JSON.parse(JSON.stringify(notifications));
            notificationsCopy[i] = notCopy;
            const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
            await firestoredb.updateDoc(userRef, {
              notifications: notificationsCopy,
            });
          } catch (err) {
            handleError(err, 'setting notification as viewed');
          }
        })();
      }
    });
  }, [notifications, user.id]);

  const deleteNotification = async (notification: NotiType) => {
    try {
      const notificationsCopy: NotiType[] = JSON.parse(JSON.stringify(notifications));
      const notiIndex = notificationsCopy.findIndex(not => not.id === notification.id);
      notificationsCopy.splice(notiIndex, 1);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);

      await firestoredb.updateDoc(userRef, {
        notifications: notificationsCopy,
      });
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  return (
    <Container>
      <CloseNotis onClick={() => setShowNotis(false)}>
        <FontAwesomeIcon icon={faTimes} color="purple" size="2x" />
      </CloseNotis>
      <ul>
        {notifications.length ? (
          notifications.map(not => (
            <Notification key={not.id}>
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

              {!not.wasViewed && (
                <div className="new">
                  <FontAwesomeIcon icon={faStar} color="red" />
                </div>
              )}
              <div className="delete" onClick={() => deleteNotification(not)}>
                <FontAwesomeIcon icon={faTrash} color="red" />
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
};

export default Notifications;
