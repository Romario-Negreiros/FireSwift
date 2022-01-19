import { firestoredb } from '../../lib';
import handleFirebaseError from '../general/handleFirebaseError';

import { Post, User } from '../../global/types';

const getPostsForConnectedUser = async (
  setPosts: (posts: Post[]) => void,
  setError: (error: string) => void,
  setIsLoaded: (isLoaded: boolean) => void,
  user: User,
  postFromNotification?: {
    id: string;
    pathSegment: string;
    commentID?: string;
    replyID?: string;
  }
) => {
  try {
    const posts: Post[] = [];
    if (postFromNotification) {
      const notificationPostRef = firestoredb.doc(
        firestoredb.db,
        `media/posts/${postFromNotification.pathSegment}`,
        postFromNotification.id
      );
      const notPostSnapshot = await firestoredb.getDoc(notificationPostRef);
      if (notPostSnapshot.exists()) {
        const post = notPostSnapshot.data() as Post;
        posts.push(post);
      }
    }
    const groupPostsRef = firestoredb.collection(firestoredb.db, 'media/posts/groups');
    const userGroupsIds = user.groups.map(gp => gp.id);
    if (userGroupsIds.length) {
      const gpPostsQuery = firestoredb.query(
        groupPostsRef,
        firestoredb.where('groupID', 'in', userGroupsIds)
      );
      const gpPostsQuerySnapshot = await firestoredb.getDocs(gpPostsQuery);
      gpPostsQuerySnapshot.forEach(doc => {
        const post = doc.data() as Post;
        if (posts.some(postQueried => postQueried.id === post.id)) {
          return;
        } else posts.push(post);
      });
    }

    const userPostsRef = firestoredb.collection(firestoredb.db, 'media/posts/users');
    if (user.friends.length) {
      const friendsPostsQuery = firestoredb.query(
        userPostsRef,
        firestoredb.where('author.id', 'in', user.friends)
      );
      const friendsPostsQuerySnapshot = await firestoredb.getDocs(friendsPostsQuery);
      friendsPostsQuerySnapshot.forEach(doc => {
        const post = doc.data() as Post;
        if (posts.some(postQueried => postQueried.id === post.id)) {
          return;
        } else posts.push(post);
      });
    }
    if (posts.length < 10) {
      const userPostsQuery = firestoredb.query(userPostsRef, firestoredb.limit(10));
      const userPostsQuerySnapshot = await firestoredb.getDocs(userPostsQuery);
      userPostsQuerySnapshot.forEach(doc => {
        const post = doc.data() as Post;
        if (posts.some(postQueried => postQueried.id === post.id)) {
          return;
        } else posts.push(post);
      });
    }
    setPosts(posts);
  } catch (err) {
    handleFirebaseError(err, setError);
  } finally {
    setIsLoaded(true);
  }
};

export default getPostsForConnectedUser;
