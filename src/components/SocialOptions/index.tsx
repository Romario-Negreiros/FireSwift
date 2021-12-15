import React from 'react';

import { useHistory } from 'react-router';

import { Container } from './styles';
import { CustomIconBox } from '../../global/styles';
import { Searcher } from '../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

const SocialOptions: React.FC = () => {
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <Container>
      <ul className="innerList">
        <li>
          <ul className="tools">
            <CustomIconBox onClick={() => redirect('/create')}>
              <FontAwesomeIcon icon={faHammer} color="purple" size="2x" />
            </CustomIconBox>
          </ul>
        </li>
        <li>
          <Searcher />
        </li>
      </ul>
    </Container>
  );
};

export default SocialOptions;
