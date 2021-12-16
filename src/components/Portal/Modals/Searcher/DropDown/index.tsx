import React from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Result, Options } from './styles';
import { Exception } from '../../../..';
import { Author, CustomIconBox } from '../../../../../global/styles';
import { InnerCenteredContainer } from '../../../../../global/styles';

import DefaultPicture from '../../../../../assets/default-picture.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

import { Result as ResultType, User } from '../../../../../global/types';

interface Props {
  error: string;
  results: ResultType[];
  user: User | null;
}

const DropDown: React.FC<Props> = ({ error, results, user }) => {
  const history = useHistory();

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
