import React from 'react';
import {ThemeProvider} from 'styled-components';
// import {NavigationContainer} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import {AppRoutes} from './src/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Register} from './src/screens/Register';

export default function App() {
  const [fonstLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  });

  if(!fonstLoaded){
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        {/* <NavigationContainer>
          <AppRoutes />
        </NavigationContainer> */}
        <Register />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}