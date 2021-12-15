import { v4 as uuidv4 } from 'uuid';
import { firestoredb } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import { toast } from 'react-toastify';

import { Post, User } from '../../global/types';

const setReply = async (
  commentID: string,
  user: User,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newReply: string
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
    postsCopy.forEach(postCopy => {
      if (postCopy.id === post.id) {
        postCopy.comments.forEach(comment => {
          if (comment.id === commentID) {
            comment.replies.push(reply);
          }
        });
      }
    });
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const postRef = firestoredb.doc(firestoredb.db, 'media/posts/users', post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postsCopy[postIndex].comments,
    });
    setPosts(postsCopy);
  } catch (err) {
    if (err instanceof Error) toast.error('Something went wrong!' + err.message);
  }
};

export default setReply;
