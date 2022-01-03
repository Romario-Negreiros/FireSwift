import React from 'react';

import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import { firestoredb } from '../../../lib';

import { Exception, Loader, Post } from '../..';
import { CenteredContainer } from '../../../global/styles';
import { Container } from './styles';

import { Post as PostType } from '../../../global/types';

interface Props {
  groupID: string;
}

const Posts: React.FC<Props> = ({ groupID }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState('');
  const [posts, setPosts] = React.useState<PostType[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const query = firestoredb.query(
          firestoredb.collection(firestoredb.db, 'media/posts/groups'),
          firestoredb.where('groupID', '==', groupID)
        );
        const posts: PostType[] = [];
        const querySnapshot = await firestoredb.getDocs(query);
        querySnapshot.forEach(doc => {
          if (doc.exists()) {
            const postData = doc.data() as PostType;
            posts.push(postData);
          }
        });
        setPosts(posts);
      } catch (err) {
        handleFirebaseError(err, setError);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [groupID]);

  if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  } else if (error) {
    return (
      <CenteredContainer>
        <Exception message={error} />
      </CenteredContainer>
    );
  } else if (!posts.length) {
    return (
      <CenteredContainer>
        <Exception message="This group haven't created any posts yet!" />
      </CenteredContainer>
    );
  }
  return (
    <Container>
      <ul className="list">
        {posts.map(post => (
          <Post key={post.id} post={post} posts={posts} setPosts={setPosts} pathSegment="groups" />
        ))}
      </ul>
    </Container>
  );
};

export default Posts;
