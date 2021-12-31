import React from 'react';

import { Container, Creator, Admins, Statistics } from './styles';
import { Author, InnerCenteredContainer } from '../../../global/styles';

import DefaultPicture from '../../../assets/default-picture.png';

import { Group } from '../../../global/types';
import { Exception } from '../..';

interface Props {
  group: Group;
}

const About: React.FC<Props> = ({ group }) => {
  return (
    <Container>
      <Creator>
        <ul className="creatorInfo">
          <li className="title">
            <h3>Creator</h3>
          </li>
          <li className="content">
            <div className="imgContainer">
              <img
                src={group.creator.picture ? group.creator.picture : DefaultPicture}
                alt={group.creator.name}
              />
            </div>
            <div className="txtContainer">
              <h4>{group.creator.name}</h4>
              <p>
                Created at: {group.creationDate.date} - {group.creationDate.time}
              </p>
            </div>
          </li>
        </ul>
      </Creator>
      <Admins>
        <li className="title">
          <h3>Admins</h3>
        </li>
        {group.admins.length ? (
          group.admins.map(admin => (
            <li key={admin.id} className="admin">
              <Author>
                <div>
                  <img src={admin.picture ? admin.picture : DefaultPicture} alt={admin.name} />
                </div>
                <div className="name">
                  <h4>{admin.name}</h4>
                </div>
              </Author>
              <div className="sinceDate">
                <p>
                  In the group since: {admin.entranceDate.date} - {admin.entranceDate.time}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li>
            <InnerCenteredContainer>
              <Exception message="This group has no admins so far!" />
            </InnerCenteredContainer>
          </li>
        )}
      </Admins>
      <Statistics>
        <li className="title">
          <h3>Statistics</h3>
        </li>
        <li className="statistics">
          <h4>Total posts</h4>
          <p>{group.posts.length}</p>
        </li>
        <li className="statistics">
          <h4>Total users</h4>
          <p>{group.users.length}</p>
        </li>
        <li className="statistics">
          <h4>Total group's likes</h4>
          <p>{group.likes.length}</p>
        </li>
      </Statistics>
    </Container>
  );
};

export default About;
