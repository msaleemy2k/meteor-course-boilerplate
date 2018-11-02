import {Meteor} from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router , Route,  Switch } from 'react-router-dom';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/','signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPages = () => {
  if(Meteor.userId()){
     window.location.replace('/dashboard');
  }
};

const onEnterPrivatePages = () => {
  if(!Meteor.userId()){
     window.location.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = window.location.pathname;
  console.log('pathname',pathname);
  console.log('isAuthenticated',isAuthenticated);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
    window.location.replace('/dashboard');
  }
  if(isAuthenticatedPage && !isAuthenticated){
    window.location.replace('/');
  }

};
export const routes = () => (
  <Router>
    <div>
      <Switch>
   <Route path="/signup" component={Signup} onEnter={onEnterPublicPages}/>
   <Route path="/dashboard" component={Dashboard}  onEnter={onEnterPrivatePages}/>
   <Route path="/" exact component={Login} onEnter={onEnterPublicPages} />
   <Route  component={NotFound}/>
 </Switch>
 </div>
 </Router>
);
