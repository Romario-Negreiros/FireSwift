import React from 'react';

import { useAppSelector } from '../../../../app/hooks';

import { Input } from '../../../../global/styles';
import { Container } from './styles';
import DropDown from './DropDown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ContentConstraints } from '../../../../global/types';

interface Props<T extends ContentConstraints> {
  content: T[];
  setIsModalVisible?: (isModalVisible: boolean) => void;
  showAll?: boolean;
}

const Searcher = <T extends ContentConstraints>(
  props: React.PropsWithChildren<Props<T>>
): React.ReactElement => {
  const user = useAppSelector(state => state.user.user);
  const [value, setValue] = React.useState('');
  const [results, setResults] = React.useState<T[]>([]);
  const { content, setIsModalVisible, showAll } = props;

  const handleClick = () => {
    if (setIsModalVisible) {
      setIsModalVisible(false);
    } else {
      setValue('');
    }
  };

  const search = React.useCallback(() => {
    const results: T[] = [];
    content.forEach(item => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        results.push(item);
      }
      setResults(results);
    });
  }, [content, value]);

  React.useEffect(() => {
    if (value) {
      search();
    } else {
      if(showAll) {
        setResults(content);
      }
    }
  }, [value, search, showAll, content]);

  return (
    <Container>
      <section>
        <Input>
          <input
            value={value}
            onChange={event => {
              setValue(event.currentTarget.value);
            }}
            placeholder="Search something..."
          />
          <div onClick={handleClick}>
            <FontAwesomeIcon color="purple" size="2x" icon={faTimes} />
          </div>
        </Input>
      </section>
      {(value || (!value && showAll)) && <DropDown<T> results={results} user={user} />}
    </Container>
  );
};

export default Searcher;
