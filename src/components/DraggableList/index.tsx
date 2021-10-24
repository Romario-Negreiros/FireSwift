import React from 'react';

import { Container } from './styles';

import { User } from '../../global/types';

interface Data {
  name: string;
  image?: string; 
}

interface Props {
  title: string;
  currentUser: User;
  data: Data[];
} 

const DraggableList: React.FC<Props> = ({ title, currentUser, data }) => {
  
  return (
    <Container>
      <h1>{title}</h1>
      <ul>
        <li>
          <h2>Options</h2>
        </li>
        {data.map(item => (
          <li>
            <span>{item.name}</span>
            <img src={item.image} alt={item.name} />
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <h2>Your list</h2>
        </li>
        {currentUser.languages.map(lang => (
          <li>{lang}</li>
        ))}
      </ul>
    </Container>
  );
};

export default DraggableList;
