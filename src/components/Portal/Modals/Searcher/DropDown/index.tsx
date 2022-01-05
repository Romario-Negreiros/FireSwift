import React from 'react';

import { useAppDispatch } from '../../../../../app/hooks';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import setChat from '../../../../../utils/setters/setChat';

import { Container, Result } from './styles';
import { Author, CustomIconBox, Options } from '../../../../../global/styles';

import DefaultPicture from '../../../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

import { ContentConstraints, User } from '../../../../../global/types';

interface Props<T extends ContentConstraints> {
  results: T[];
  user: User | null;
}

interface ForceChat extends Omit<ContentConstraints, 'chats' | 'role'> {
  chats: {
    id: string;
    receiverID: string;
  }[];
}

const DropDown = <T extends ContentConstraints>(
  props: React.PropsWithChildren<Props<T>>
): React.ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { results, user } = props;

  return (
    <Container>
      {results.map(item => (
        <Result key={item.id}>
          <Author>
            <div>
              <img src={item.picture ? item.picture : DefaultPicture} alt={item.name} />
            </div>
            <div className="name">
              <h2>{item.name}</h2>
              {item.chats ? <small>User</small> : <small>Group</small>}
            </div>
          </Author>
          <Options>
            <CustomIconBox
              onClick={() =>
                history.push({
                  pathname: `/${item.chats ? 'users' : 'groups'}/${item.name}`,
                  state: {
                    id: item.id,
                  },
                })
              }
            >
              <FontAwesomeIcon size="2x" color="purple" icon={faUser} />
            </CustomIconBox>
            {item.chats && (
              <CustomIconBox
                onClick={() => {
                  if (user) setChat(item as ForceChat, user, dispatch, history);
                  else toast.error('You need to be logged in to create a chat!');
                }}
              >
                <FontAwesomeIcon size="2x" color="purple" icon={faCommentDots} />
              </CustomIconBox>
            )}
          </Options>
        </Result>
      ))}
    </Container>
  );
};

export default DropDown;
