import { firestoredb } from '../lib';

import { toast } from 'react-toastify';

import { Post } from '../global/types';

const setReaction = async (
  id: string,
  post: Post,
  newReaction: string,
  setPosts: (callback: (oldPosts: Post[]) => void) => void
) => {
  try {
    const postCopy = { ...post };
    if (postCopy.reactions.some(reactionObj => reactionObj.id === id)) {
      postCopy.reactions.forEach(reactionObj => {
        if (reactionObj.id === id) reactionObj.reaction = newReaction;
      });
    } else {
      postCopy.reactions.push({
        id,
        reaction: newReaction,
      });
    }
    setPosts(oldPosts => {
      const removeOldReaction = oldPosts.filter(oldPost => {
        return (
          oldPost.id === post.id && oldPost.reactions.some(reactionObj => reactionObj.id === id)
        );
      });
      return [...removeOldReaction, postCopy];
    });
    const postRef = firestoredb.doc(firestoredb.db, 'media/posts/users', post.id);
    await firestoredb.updateDoc(postRef, {
      reactions: postCopy.reactions,
    });
  } catch (err) {
    if (err instanceof Error) toast.error('Something went wrong, please try again!' + err.message);
  }
};

export default setReaction;
