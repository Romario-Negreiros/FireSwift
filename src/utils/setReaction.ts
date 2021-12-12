import { firestoredb } from '../lib';

import { toast } from 'react-toastify';
import { Post } from '../global/types';

const setReaction = async (
  id: string,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newReaction: string
) => {
  try {
    const postsCopy = [...posts];
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const reactionIndex = postsCopy[postIndex].reactions.findIndex(reaction => reaction.id === id);
    if (reactionIndex === -1) {
      postsCopy[postIndex].reactions.push({
        id,
        reaction: newReaction,
      });
    } else {
      postsCopy[postIndex].reactions[reactionIndex].reaction = newReaction;
    }
    const postRef = firestoredb.doc(firestoredb.db, 'media/posts/users', post.id);
    await firestoredb.updateDoc(postRef, {
      reactions: postsCopy[postIndex].reactions,
    });
    setPosts(postsCopy);
  } catch (err) {
    if (err instanceof Error) toast.error('Something unnexpected happened!');
  }
};

export default setReaction;
