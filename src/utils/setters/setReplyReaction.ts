import { firestoredb } from '../../lib';
import handleError from '../general/handleError';
import getFormattedDate from '../getters/getFormattedDate';
import { v4 as uuidv4 } from 'uuid';

import { Post, User, Notification } from '../../global/types';

const setReplyReaction = async (
  user: User,
  commentID: string,
  replyID: string,
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
      message: `${user.name} reacted with a ${newReaction} in your reply in a comment!`,
      sentAt: getFormattedDate(),
      post: {
        id: post.id,
        pathSegment,
        commentID,
        replyID,
      }
    };
    const postsCopy = [...posts];
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const commentIndex = postsCopy[postIndex].comments.findIndex(
      comment => comment.id === commentID
    );
    const replyIndex = postsCopy[postIndex].comments[commentIndex].replies.findIndex(
      reply => reply.id === replyID
    );
    const reactionIndex = postsCopy[postIndex].comments[commentIndex].replies[
      replyIndex
    ].reactions.findIndex(reaction => reaction.id === user.id);
    if (reactionIndex === -1) {
      postsCopy[postIndex].comments[commentIndex].replies[replyIndex].reactions.push({
        id: user.id,
        reaction: newReaction,
      });
    } else {
      postsCopy[postIndex].comments[commentIndex].replies[replyIndex].reactions[
        reactionIndex
      ].reaction = newReaction;
    }
    const replyAuthorRef = firestoredb.doc(
      firestoredb.db,
      'users',
      postsCopy[postIndex].comments[commentIndex].replies[replyIndex].author.id
    );
    const repAutSnap = await firestoredb.getDoc(replyAuthorRef);
    if (repAutSnap.exists()) {
      const authorData = repAutSnap.data() as Omit<User, 'id'>;
      authorData.notifications.unshift(newNotification);
      await firestoredb.updateDoc(replyAuthorRef, {
        notifications: authorData.notifications,
      });
    }
    const postRef = firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postsCopy[postIndex].comments,
    });
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, "setting reaction in a post's reply");
  }
};

export default setReplyReaction;
