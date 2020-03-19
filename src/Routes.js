import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from "./components/DrawerContent";
import Header from "./components/Header";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import AddAccount from "./screens/AddAccount";
import Connect from "./screens/Connect";
import OTP from "./screens/OTP";
import Result from "./screens/Result";
import PhoneNumber from "./screens/PhoneNumber";
import {connect} from 'react-redux';
import Payment1 from './screens/Payment1';
import Payment2 from './screens/Payment2';
import Payment3 from './screens/Payment3';

const HomeStackNav = createStackNavigator();

function HomeScreen() {
  return (
    <HomeStackNav.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({scene, navigation}) => (
          <Header scene={scene} navigation={navigation} />
        ),
      }}>
      <HomeStackNav.Screen name="Payment3" component={Payment3} />
      <HomeStackNav.Screen name="AddAccount" component={AddAccount} />
      <HomeStackNav.Screen name="Connect" component={Connect} />
      <HomeStackNav.Screen name="OTP" component={OTP} />
      <HomeStackNav.Screen name="Result" component={Result} />
      <HomeStackNav.Screen name="PhoneNumber" component={PhoneNumber} />
      <HomeStackNav.Screen name="Payment1" component={Payment1} />
      <HomeStackNav.Screen name="Payment2" component={Payment2} />
      {/* <HomeStackNav.Screen name="Payment3" component={Payment3} /> */}
    </HomeStackNav.Navigator>
  );
}

const MainDrawer = createDrawerNavigator();

function Main() {
  return (
    <MainDrawer.Navigator drawerContent={() => <DrawerContent />}>
      <MainDrawer.Screen name="Home" component={HomeScreen} />
    </MainDrawer.Navigator>
  );
}

const AppStackNav = createStackNavigator();

function NavigationScreens({token}) {
  return (
    <AppStackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
            {token
                ? (<AppStackNav.Screen name="Main" component={Main} />)
                : (
                    <Fragment>
                        <AppStackNav.Screen name="Login" component={Login} />
                        <AppStackNav.Screen name="Signup" component={Signup} />
                    </Fragment>
                )
            }
        </AppStackNav.Navigator>
    );
}

function mapStateToProps(state) {
  return {token: state.auth.token};
}

export default connect(mapStateToProps)(NavigationScreens);