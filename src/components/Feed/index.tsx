import React from 'react';
import { Container } from './styles';

import { Post } from '..';

const Feed: React.FC = () => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <Container>
      <ul>
        {arr.map(() => (
          <Post key={Math.floor(Math.random() * 10000)} />
        ))}
      </ul>
    </Container>
  );
};

export default Feed;
