import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Points from './pages/Points';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }}>
        <Stack.Screen component={Home} key='Home' name='Home' />
        <Stack.Screen component={Detail} key='Detail' name='Detail' />
        <Stack.Screen component={Points} key='Points' name='Points' />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
