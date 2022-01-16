import { firestoredb } from '../../lib';
import handleError from '../general/handleError';
import getFormattedDate from '../getters/getFormattedDate';
import { v4 as uuidv4 } from 'uuid';

import { Post, User, Notification } from '../../global/types';

const setPostReaction = async (
  user: User,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newReaction: string,
  pathSegment: string
) => {
  try {
    const newNotification: Notification = {
      id: uuidv4(),
      sentBy: {
        id: user.id,
        name: user.name,
        picture: user.picture,
      },
      wasViewed: false,
      message: `${user.name} reacted to your post!`,
      sentAt: getFormattedDate(),
      post: {
        id: post.id,
        pathSegment,
      }
    };
    const postsCopy = [...posts];
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const reactionIndex = postsCopy[postIndex].reactions.findIndex(
      reaction => reaction.id === user.id
    );
    if (reactionIndex === -1) {
      postsCopy[postIndex].reactions.push({
        id: user.id,
        reaction: newReaction,
      });
    } else {
      postsCopy[postIndex].reactions[reactionIndex].reaction = newReaction;
    }
    const postRef = firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id);
    await firestoredb.updateDoc(postRef, {
      reactions: postsCopy[postIndex].reactions,
    });
    const postAuthorRef = firestoredb.doc(firestoredb.db, 'users', post.author.id);
    const postAutSnap = await firestoredb.getDoc(postAuthorRef);
    if (postAutSnap.exists()) {
      const authorData = postAutSnap.data() as Omit<User, 'id'>;
      authorData.notifications.unshift(newNotification);
      await firestoredb.updateDoc(postAuthorRef, {
        notifications: authorData.notifications,
      });
    }
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, 'setting reaction in a post.');
  }
};

export default setPostReaction;
