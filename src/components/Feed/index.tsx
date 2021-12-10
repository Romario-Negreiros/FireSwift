import React from 'react';

import { firestoredb } from '../../lib';

import { Container } from './styles';
import { InnerCenteredContainer } from '../../global/styles';
import { Post, Loader, Exception } from '..';

import { Post as PostType } from '../../global/types';
import handleFirebaseError from '../../utils/handleFirebaseError';

const Feed: React.FC = () => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const postsSnapshot = await firestoredb.getDocs(
          firestoredb.collection(firestoredb.db, 'media/posts/users')
        );

        if (!postsSnapshot.empty) {
          const posts: PostType[] = [];
          postsSnapshot.forEach(post => {
            const { id } = post;
            const postData = post.data() as Omit<PostType, 'id'>;
            const postObj: PostType = {
              ...postData,
              id,
            };
            posts.push(postObj);
          });
          setPosts(posts);
        } else setError('No posts were found!');
      } catch (err) {
        handleFirebaseError(err, setError);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  if (!isLoaded) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Loader />
        </InnerCenteredContainer>
      </Container>
    );
  } else if (error || !posts) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Exception message={error} />
        </InnerCenteredContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ul>
        {posts.map(post => (
          <Post key={post.id} post={post} setPosts={setPosts as (callback: (oldPosts: PostType[]) => void) => void} />
        ))}
      </ul>
    </Container>
  );
};

export default Feed;
