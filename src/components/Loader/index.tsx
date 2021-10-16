import React from 'react';
import { CenteredContainer, LoaderSpin } from './styles';

const Loader: React.FC = () => {
  return (
    <CenteredContainer>
      <LoaderSpin />
    </CenteredContainer>
  );
};

export default Loader;
