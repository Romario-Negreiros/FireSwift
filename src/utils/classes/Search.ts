import { Result, User } from '../../global/types';

class Search {
  static byUsers = (users: User[], value: string, setResults: (results: Result[]) => void) => {
    const results: Result[] = [];
    users.forEach(user => {
      if(user.name.includes(value)) {
        results.push({
          id: user.id,
          name: user.name,
          picture: user.picture,
          type: 'User',
        })
      }
    })
    setResults(results);
  };

  static byGroups = () => {};

  static byBoth = (users: User[], value: string, setResults: (results: Result[]) => void) => {
    Search.byUsers(users, value, setResults);
  };
}

export default Search;
