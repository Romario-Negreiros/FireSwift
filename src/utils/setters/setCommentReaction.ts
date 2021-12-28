import { firestoredb } from '../../lib';
import handleError from '../general/handleError';

import { Post } from '../../global/types';

const setCommentReaction = async (
  userID: string,
  commentID: string,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newReaction: string
) => {
  try {
    const postsCopy = [...posts];
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const commentIndex = postsCopy[postIndex].comments.findIndex(
      comment => comment.id === commentID
    );
    const reactionIndex = postsCopy[postIndex].comments[commentIndex].reactions.findIndex(
      reaction => reaction.id === userID
    );
    if (reactionIndex === -1) {
      postsCopy[postIndex].comments[commentIndex].reactions.push({
        id: userID,
        reaction: newReaction,
      });
    } else {
      postsCopy[postIndex].comments[commentIndex].reactions[reactionIndex].reaction = newReaction;
    }
    const postRef = firestoredb.doc(firestoredb.db, 'media/posts/users', post.id);
    await firestoredb.updateDoc(postRef, {
      comments: postsCopy[postIndex].comments,
    });
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, 'setting reaction in a comment.')
  }
};

export default setCommentReaction;
