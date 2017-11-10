import React from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default class Routes extends React.Component {
  render() {
    return (
        <Router>
          <Stack key="root" >
            <Scene key="Home" component={Home} title="Home" initial={true}/>
            <Scene key="Login" component={Login} title="Login"/>
            <Scene key="Signup" component={Signup} title="Signup"/>
          </Stack>
        </Router>


    );
  }
}
