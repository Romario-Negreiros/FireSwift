import { firestoredb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import { v4 as uuidv4 } from 'uuid';
import handleError from '../general/handleError';

import { Post, User, Notification } from '../../global/types';

const setCommentReaction = async (
  user: User,
  commentID: string,
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
      message: `${user.name} reacted with a ${newReaction} in your comment!`,
      sentAt: getFormattedDate(),
      post: {
        id: post.id,
        pathSegment,
        commentID,
      }
    };
    const postsCopy = [...posts];
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const commentIndex = postsCopy[postIndex].comments.findIndex(
      comment => comment.id === commentID
    );
    const reactionIndex = postsCopy[postIndex].comments[commentIndex].reactions.findIndex(
      reaction => reaction.id === user.id
    );
    if (reactionIndex === -1) {
      postsCopy[postIndex].comments[commentIndex].reactions.push({
        id: user.id,
        reaction: newReaction,
      });
    } else {
      postsCopy[postIndex].comments[commentIndex].reactions[reactionIndex].reaction = newReaction;
    }
    const commentAuthorRef = firestoredb.doc(
      firestoredb.db,
      'users',
      postsCopy[postIndex].comments[commentIndex].author.id
    );
    const cmntAutSnap = await firestoredb.getDoc(commentAuthorRef);
    if (cmntAutSnap.exists()) {
      const authorData = cmntAutSnap.data() as Omit<User, 'id'>;
      authorData.notifications.unshift(newNotification);
      await firestoredb.updateDoc(commentAuthorRef, {
        notifications: authorData.notifications,
      });
    }
    const postRef = firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postsCopy[postIndex].comments,
    });
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, 'setting reaction in a comment.');
  }
};

export default setCommentReaction;
