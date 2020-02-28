import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddAccount from "./screens/AddAccount";
import Connect from "./screens/Connect";
import OTP from "./screens/OTP";
import Result from "./screens/Result";

enableScreens();

const stackNav = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stackNav.Navigator>
        <stackNav.Screen name="Home" component={AddAccount} />
        <stackNav.Screen name="Connect" component={Connect} />
        <stackNav.Screen name="OTP" component={OTP} />
        <stackNav.Screen name="Result" component={Result} />
      </stackNav.Navigator>
    </NavigationContainer>
  );
}