//Developer: Pablo Larios

import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { Root } from 'native-base';

//Import views
import Splash from './src/app/views/splash.view';
import Login from './src/app/views/login.view';
import EditUser from './src/app/views/editUser.view';
import ListUsers from './src/app/views/listUsers.view';

export default class App extends Component {
  constructor(properties) {
    super(properties);
  }

  render() {
    return (
      <Root>
        <Router>
          <Stack hideNavBar key="root">
            <Scene
              hideNavBar
              key="Splash"
              back={false}
              component={Splash}
              title="Splash"
              initial={true}
            />
            <Scene
              hideNavBar
              key="Login"
              back={false}
              component={Login}
              title="Login"
            />
             <Scene
              hideNavBar
              key="ListUsers"
              back={false}
              component={ListUsers}
              title="ListUsers"
            />
             <Scene
              hideNavBar
              key="EditUser"
              back={false}
              component={EditUser}
              title="EditUser"
            />
          </Stack>
        </Router>
      </Root>
    );
  }
}
