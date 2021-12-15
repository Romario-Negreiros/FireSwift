import React from 'react';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../../../app/hooks';
import setChat from '../../../../../utils/setters/setChat';

import { Container, Result, Options } from './styles';
import { Exception } from '../../../..';
import { Author, CustomIconBox } from '../../../../../global/styles';
import { InnerCenteredContainer } from '../../../../../global/styles';

import DefaultPicture from '../../../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

import { Chat, Result as ResultType, User } from '../../../../../global/types';

interface Props {
  error: string;
  results: ResultType[];
  user: User | null;
}

const DropDown: React.FC<Props> = ({ error, results, user }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  if (error) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Exception message={error} />
        </InnerCenteredContainer>
      </Container>
    );
  } else {
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
                <small>{item.type}</small>
              </div>
            </Author>
            <Options>
              <CustomIconBox
                onClick={() =>
                  history.push({
                    pathname: `/${item.name}`,
                    state: {
                      id: item.id,
                    },
                  })
                }
              >
                <FontAwesomeIcon size="2x" color="purple" icon={faUser} />
              </CustomIconBox>
              <CustomIconBox
                onClick={() => {
                  if (user) {
                    if (!user.chats.some(chat => chat.receiverID === user.id)) {
                      const chatUsers: Chat['users'] = [
                        {
                          id: user.id,
                          name: user.name,
                          picture: user.picture,
                          chats: user.chats,
                        },
                        {
                          id: item.id,
                          name: item.name,
                          picture: item.picture,
                          chats: item.chats
                        },
                      ];
                      setChat(chatUsers, user, history, dispatch);
                    } else toast.error('You already have a chat with this user!');
                  } else toast.error('You need to be logged in to create a chat!');
                }}
              >
                <FontAwesomeIcon size="2x" color="purple" icon={faCommentDots} />
              </CustomIconBox>
            </Options>
          </Result>
        ))}
      </Container>
    );
  }
};

export default DropDown;
