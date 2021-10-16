import React from 'react';
import Header from './Header';

import { Props } from '../global/types';

const Layout: React.FC<Props> = ({ toggleTheme, children }) => {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      {children}
    </>
  );
};

export default Layout;
