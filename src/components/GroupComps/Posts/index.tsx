import React from 'react';

import { Exception, Loader } from '../..';
import { CenteredContainer } from '../../../global/styles';
import { Container } from './styles';

// import { Post } from '../../../global/types';

interface Props {
  // groupID: string;
}

const Posts: React.FC<Props> = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState('');
  // const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        console.log(setError, setIsLoaded);
      } catch (err) {}
    })();
  }, []);

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
  }
  return <Container></Container>;
};

export default Posts;
