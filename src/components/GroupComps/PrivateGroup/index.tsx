import React from 'react';

import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import { firestoredb } from '../../../lib';
import { toast } from 'react-toastify';

import { Container, Title, ChangeState } from './styles';

import { Group } from '../../../global/types';

interface Props {
  group: Group;
  setGroup: (group: Group | null) => void;
}

const PrivateGroup: React.FC<Props> = ({ group, setGroup }) => {
  const makeOpen = async (group: Group) => {
    try {
      const groupCopy: Group = JSON.parse(JSON.stringify(group));
      const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
      groupCopy.private = false;

      await firestoredb.updateDoc(groupRef, {
        private: false,
      });
      setGroup(groupCopy);
      toast('The group is now opened!');
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const makePrivate = async (group: Group) => {
    try {
      const groupCopy: Group = JSON.parse(JSON.stringify(group));
      const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
      groupCopy.private = true;

      await firestoredb.updateDoc(groupRef, {
        private: true,
      });
      setGroup(groupCopy);
      toast('The group is now private!');
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  return (
    <Container>
      <Title>
        <h1>Change group access state</h1>
        <p>The group is currently {group.private ? 'private' : 'opened'}</p>
      </Title>
      <ChangeState
        onClick={() => {
          if (group.private) makeOpen(group);
          else makePrivate(group);
        }}
      >
        {group.private ? 'Make open' : 'Make private'}
      </ChangeState>
    </Container>
  );
};

export default PrivateGroup;
