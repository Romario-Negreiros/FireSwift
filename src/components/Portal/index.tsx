import React from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FC = props => {
  return createPortal(props.children, document.getElementById('modal') as HTMLDivElement);
};

export default Portal;
