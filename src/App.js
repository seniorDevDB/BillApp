import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from "./redux/store";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Secured from "./screens/Secured";

import AddAccount from "./screens/AddAccount";
import Connect from "./screens/Connect";
import OTP from "./screens/OTP";
import Result from "./screens/Result";

const stackNav = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stackNav.Navigator>
          <stackNav.Screen name="Login" component={Login} />
          <stackNav.Screen name="Signup" component={Signup} />
          <stackNav.Screen name="Secured" component={Secured} />
          <stackNav.Screen name="Home" component={AddAccount} />
          <stackNav.Screen name="Connect" component={Connect} />
          <stackNav.Screen name="OTP" component={OTP} />
          <stackNav.Screen name="Result" component={Result} />
        </stackNav.Navigator>
      </NavigationContainer>
    </Provider>
  );
}