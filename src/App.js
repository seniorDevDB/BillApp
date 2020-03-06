import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { Provider } from 'react-redux';

import store from "./redux/store";
import NavigationScreens from './Routes';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={PaperDarkTheme}>
        <NavigationContainer theme={DarkTheme}>
          <NavigationScreens />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}