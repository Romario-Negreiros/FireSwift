import { firestoredb, storage } from '../lib';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import { Post, User } from '../global/types';

const setComment = async (
  user: User,
  post: Post,
  setPosts: (callback: (oldPosts: Post[]) => void) => void,
  newComment: string
) => {
  try {
    const postCopy = { ...post };
    const author = {
      id: user.id,
      name: user.name,
      hasPicture: user.hasPicture,
      picture: '',
    };
    if (user.hasPicture) {
      const storageRef = storage.ref(storage.storage, `users${user.id}`);
      const pictureUrl = await storage.getDownloadURL(storageRef);
      author.picture = pictureUrl;
    }
    const comment = {
      id: uuidv4(),
      author: author,
      content: newComment,
      reactions: [],
      replies: [],
    };
    postCopy.comments.push(comment);
    setPosts(oldPosts => {
      const oldPostsCopy = [...oldPosts];
      oldPostsCopy.forEach(oldPost => {
        if (oldPost.id === post.id) {
          oldPost.comments.push(comment);
        }
      });
      return oldPostsCopy;
    });
    const postRef = firestoredb.doc(firestoredb.db, 'media/posts/users', post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postCopy.comments,
    });
  } catch (err) {
    if (err instanceof Error) toast.error('Something went wrong!' + err.message);
  }
};

export default setComment;
