import React from 'react';
import { LoaderSpin } from './styles';

interface Props {
  size?: string;
}

const Loader: React.FC<Props> = ({ size }) => {
  if (size) {
    return <LoaderSpin size={size} />;
  }
  return <LoaderSpin />;
};

export default Loader;
