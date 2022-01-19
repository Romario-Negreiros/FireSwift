import React from 'react';

import { useHistory } from 'react-router-dom';

// Fallback for notifications mechanism

// When user clicks in a notification that would redirect him to home, but he is already there

// This page is used to allow the state changing, and pass the notification data to the state

const Fallback: React.FC = () => {
  const history = useHistory();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      history.push('/home');
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  });

  return <></>;
};

export default Fallback;
