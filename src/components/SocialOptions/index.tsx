import React from 'react';

import { useHistory } from 'react-router';

import { Container } from './styles';
import { CustomIconBox } from '../../global/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faSearch } from '@fortawesome/free-solid-svg-icons';

const SocialOptions: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path)
  }

  return (
    <Container>
      <ul className="innerList">
        <li>
          <div className="explore">
            <input
              type="text"
              value={searchValue}
              onChange={event => setSearchValue(event.currentTarget.value)}
              placeholder="Search something..."
            />
            <div>
              <FontAwesomeIcon icon={faSearch} color="purple" size="2x" />
            </div>
          </div>
        </li>
        <li>
          <ul className="tools">
            <CustomIconBox onClick={() => redirect('/create')}>
              <FontAwesomeIcon icon={faHammer} color="purple" size="2x" />
            </CustomIconBox>
          </ul>
        </li>
      </ul>
    </Container>
  );
};

export default SocialOptions;
