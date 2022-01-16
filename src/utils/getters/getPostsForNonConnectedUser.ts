import { firestoredb } from '../../lib';
import handleFirebaseError from '../general/handleFirebaseError';

import { Post } from '../../global/types';

const getPostsForNonConnectedUser = async (
  setPosts: (posts: Post[]) => void,
  setError: (error: string) => void,
  setIsLoaded: (isLoaded: boolean) => void
) => {
  try {
    const postsSnapshot = await firestoredb.getDocs(
      firestoredb.collection(firestoredb.db, 'media/posts/users')
    );

    if (!postsSnapshot.empty) {
      const posts: Post[] = [];
      postsSnapshot.forEach(post => {
        const postData = post.data() as Post;
        posts.push(postData);
      });
      setPosts(posts);
    } else setError('No posts were found!');
  } catch (err) {
    handleFirebaseError(err, setError);
  } finally {
    setIsLoaded(true);
  }
};

export default getPostsForNonConnectedUser;
