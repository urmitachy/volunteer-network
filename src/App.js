import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Registration from './components/Registration/Registration';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import RegistrationList from './components/RegistrationList/RegistrationList';
import VolunteerList from './components/VolunteerList/VolunteerList';
import AddEvent from './components/AddEvent/AddEvent';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className='App'>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
        <Router>
          <Switch>
            <Route path="/home">
              <Header />
            </Route>
            <Route path="/login"><Login /></Route>
            <PrivateRoute path="/registration/:eventName">
              <Registration />
            </PrivateRoute>           
            <PrivateRoute path="/registrationList"><RegistrationList /></PrivateRoute>           
            <Route path="/people"><VolunteerList /></Route>
            <Route path="/addEvent"><AddEvent /></Route>
            <Route exact path="/">
              <Header />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
