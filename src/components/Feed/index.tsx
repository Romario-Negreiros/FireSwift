import React from 'react';

import { useAppSelector } from '../../app/hooks';
import getPostsForNonConnectedUser from '../../utils/getters/getPostsForNonConnectedUser';
import getPostsForConnectedUser from '../../utils/getters/getPostsForConnectedUser';

import { Container } from './styles';
import { InnerCenteredContainer } from '../../global/styles';
import { Post, Loader, Exception } from '..';

import { Post as PostType } from '../../global/types';

interface Props {
  statePost?: {
    id: string;
    pathSegment: string;
    commentID?: string;
    replyID?: string;
  };
}

const Feed: React.FC<Props> = ({ statePost }) => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const user = useAppSelector(state => state.user.user);

  React.useEffect(() => {
    if (!user) {
      getPostsForNonConnectedUser(setPosts, setError, setIsLoaded);
    } else getPostsForConnectedUser(setPosts, setError, setIsLoaded, user, statePost);
  }, [user, statePost]);

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
        {posts.map(post => {
          if (statePost && statePost.id === post.id) {
            return (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
                pathSegment="users"
                statePost={statePost}
              />
            );
          } else {
            return (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
                pathSegment="users"
              />
            );
          }
        })}
      </ul>
    </Container>
  );
};

export default Feed;
