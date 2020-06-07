import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
  useFonts,
} from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

export default function App() {
  const fontsloaded = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Ubuntu_700Bold,
    Roboto_500Medium,
  });

  if (!fontsloaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </>
  );
}
