import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './components/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './components/redux/actions/authActions';
import { clearCurrentProfile } from './components/redux/actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if(localStorage.devConnector) {
  // Set auth token header auth
  setAuthToken(localStorage.devConnector);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.devConnector);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute path="/post/:id" component={Post} />
              </Switch>
              <Route path="/not-found" component={NotFound} />
            </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
