import React, {Fragment} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './components/DrawerContent';
import Header from './components/Header';
import Login from './screens/signup/Login';
import Signup from './screens/signup/Signup';
import AddAccount from './screens/connect/AddAccount';
import Connect from './screens/connect/Connect';
import OTP from './screens/connect/OTP';
import Result from './screens/connect/Result';
import PhoneNumber from './screens/connect/PhoneNumber';
import Bill from './screens/connect/Bill';
import BillPayment from './screens/connect/BillPayment';
import BillAccountType from './screens/paymentAccountType/BillAccountType';
import CreditVisa from './screens/paymentAccountType/CreditVisa';
import Checking from './screens/paymentAccountType/Checking';
import ChooseDate from './screens/connect/ChooseDate';
import ChooseAmount from './screens/connect/ChooseAmount';
import InputAmount from './screens/connect/InputAmount';
import {connect} from 'react-redux';
import Payment1 from './screens/payment/Payment1';
import Payment2 from './screens/payment/Payment2';
import Payment3 from './screens/payment/Payment3';
import PaymentReview from './screens/payment/PaymentReview';
import BillLoginPopup from './components/BillLoginPopup';

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
      <HomeStackNav.Screen name="Bill" component={Bill} />
      <HomeStackNav.Screen name="AddAccount" component={AddAccount} />
      <HomeStackNav.Screen name="Connect" component={Connect} />
      <HomeStackNav.Screen name="OTP" component={OTP} />
      <HomeStackNav.Screen name="Result" component={Result} />
      <HomeStackNav.Screen name="PhoneNumber" component={PhoneNumber} />
      <HomeStackNav.Screen name="Payment1" component={Payment1} />
      <HomeStackNav.Screen name="Payment2" component={Payment2} />
      <HomeStackNav.Screen name="Payment3" component={Payment3} />
      <HomeStackNav.Screen name="PaymentReview" component={PaymentReview} />
      {/* <HomeStackNav.Screen name="Bill" component={Bill} /> */}
      <HomeStackNav.Screen name="BillPayment" component={BillPayment} />
      <HomeStackNav.Screen name="BillAccountType" component={BillAccountType} />
      <HomeStackNav.Screen name="ChooseDate" component={ChooseDate} />
      <HomeStackNav.Screen name="ChooseAmount" component={ChooseAmount} />
      <HomeStackNav.Screen name="BillLoginPopup" component={BillLoginPopup} />
      <HomeStackNav.Screen name="InputAmount" component={InputAmount} />
      <HomeStackNav.Screen name="CreditVisa" component={CreditVisa} />
      <HomeStackNav.Screen name="Checking" component={Checking} />
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
      {token ? (
        <AppStackNav.Screen name="Main" component={Main} />
      ) : (
        <Fragment>
          <AppStackNav.Screen name="Login" component={Login} />
          <AppStackNav.Screen name="Signup" component={Signup} />
        </Fragment>
      )}
    </AppStackNav.Navigator>
  );
}

function mapStateToProps(state) {
  return {token: state.auth.token};
}

export default connect(mapStateToProps)(NavigationScreens);
