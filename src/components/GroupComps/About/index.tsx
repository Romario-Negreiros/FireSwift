import React from 'react';

import { Container, Creator, Admins, Statistics } from './styles';
import { Author } from '../../../global/styles';

import MockUserPic from '../../../assets/default-picture.png';

const About: React.FC = () => {
  return (
    <Container>
      <Creator>
        <ul className="creatorInfo">
          <li className="title">
            <h3>Creator</h3>
          </li>
          <li className="content">
            <div className="imgContainer">
              <img src={MockUserPic} alt="creator name" />
            </div>
            <div className="txtContainer">
              <h4>creator name</h4>
              <p>creation date</p>
            </div>
          </li>
        </ul>
      </Creator>
      <Admins>
        <li className="title">
          <h3>Admins</h3>
        </li>
        {new Array(5).fill(1).map((_, i) => (
          <li key={i} className="admin">
            <Author>
              <div>
                <img src={MockUserPic} alt="okokokok" />
              </div>
              <div className="name">
                <h4>admin name hey</h4>
              </div>
            </Author>
            <div className="sinceDate">
              <p>Admin since: 14/07/2000</p>
            </div>
          </li>
        ))}
      </Admins>
      <Statistics>
        <li className="title">
          <h3>Statistics</h3>
        </li>
        <li className="statistics">
          <h4>Total posts</h4>
          <p>45873</p>
        </li>
        <li className="statistics">
          <h4>Total users</h4>
          <p>645498</p>
        </li>
        <li className="statistics">
          <h4>Total group's likes</h4>
          <p>566898</p>
        </li>
      </Statistics>
    </Container>
  );
};

export default About;
