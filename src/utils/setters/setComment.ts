import { v4 as uuidv4 } from 'uuid';
import { firestoredb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import handleError from '../general/handleError';
import { Post, User, Notification } from '../../global/types';

const setComment = async (
  user: User,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newComment: string,
  pathSegment: string
) => {
  try {
    const postsCopy = [...posts];
    const author = {
      id: user.id,
      name: user.name,
      picture: user.picture,
    };
    const newNotification: Notification = {
      id: uuidv4(),
      sentBy: author,
      wasViewed: false,
      message: `${author.name} commented in your post: ${newComment}`,
      sentAt: getFormattedDate(),
    };
    const formattedDate = getFormattedDate();
    const comment = {
      id: uuidv4(),
      author: author,
      content: newComment,
      reactions: [],
      replies: [],
      formattedDate,
    };
    postsCopy.forEach(postCopy => {
      if (postCopy.id === post.id) {
        postCopy.comments.push(comment);
      }
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
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const postRef = firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postsCopy[postIndex].comments,
    });
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, 'sending comment.');
  }
};

export default setComment;
