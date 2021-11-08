import React from 'react';

import { Container } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faSearch } from '@fortawesome/free-solid-svg-icons';

const SocialOptions: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <Container>
      <ul>
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
          <div className="tools">
            <div>
              <FontAwesomeIcon icon={faBox} color="purple" size="2x" />
            </div>
          </div>
        </li>
      </ul>
    </Container>
  );
};

export default SocialOptions;
