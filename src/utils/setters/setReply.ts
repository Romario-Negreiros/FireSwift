import { v4 as uuidv4 } from 'uuid';
import { firestoredb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import handleError from '../general/handleError';

import { Post, User, Notification } from '../../global/types';

const setReply = async (
  commentID: string,
  user: User,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newReply: string,
  pathSegment: string
) => {
  try {
    const postsCopy = [...posts];
    const author = {
      id: user.id,
      name: user.name,
      picture: user.picture,
    };
    const formattedDate = getFormattedDate();
    const reply = {
      id: uuidv4(),
      author: author,
      content: newReply,
      reactions: [],
      formattedDate,
    };
    const newNotification: Notification = {
      id: uuidv4(),
      sentBy: author,
      wasViewed: false,
      message: `${author.name} replied to you in a post: ${newReply}!`,
      sentAt: getFormattedDate(),
      post: {
        id: post.id,
        pathSegment,
        commentID,
        replyID: reply.id,
      }
    };
    postsCopy.forEach(postCopy => {
      if (postCopy.id === post.id) {
        postCopy.comments.forEach(async comment => {
          if (comment.id === commentID) {
            comment.replies.push(reply);
            const authorRef = firestoredb.doc(firestoredb.db, 'users', comment.author.id);
            const authorSnapshot = await firestoredb.getDoc(authorRef);
            if (authorSnapshot.exists()) {
              const authorData = authorSnapshot.data() as Omit<User, 'id'>;
              authorData.notifications.unshift(newNotification);
              await firestoredb.updateDoc(authorRef, {
                notifications: authorData.notifications,
              });
            }
          }
        });
      }
    });
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const postRef = firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postsCopy[postIndex].comments,
    });
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, 'sending reply to post.');
  }
};

export default setReply;
