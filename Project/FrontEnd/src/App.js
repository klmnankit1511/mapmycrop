import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Location from './Component/Locations/Location';
import Login from './Component/Login/Login';
import SignUp from './Component/SignUp/Signup';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/weather" component={Location} />

        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
