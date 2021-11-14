import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Chats from './Chats';
import Login from './Login';
import CreateAccount from './CreateAccount';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import Create from './Create';

const Pages: React.FC = () => {

  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/chats" component={Chats} />
      <Route path="/login" component={Login} />
      <Route path="/createaccount" component={CreateAccount} />
      <Route path="/editprofile" component={EditProfile} />
      <Route path="/create" component={Create} />
      <Route path="/:username" component={UserProfile} />
      <Redirect path="/" to="/home" />
    </Switch>
  );
};

export default Pages;
