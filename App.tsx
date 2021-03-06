import React from 'react';
import {ThemeProvider} from 'styled-components';
import AppLoading from 'expo-app-loading';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import {Routes} from './src/routes';

// import {AppRoutes} from './src/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { SignIn } from './src/screens/SignIn';

import {AuthProvider, useAuth} from './src/hooks/auth';

export default function App() {
  const [fonstLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  });
  const {userStorageLoading} = useAuth();

  if(!fonstLoaded || userStorageLoading){
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#5636D3" />
        <AuthProvider >
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}