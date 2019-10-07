import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Containers from './containers';

const MainNavigator = createStackNavigator({
  Login: {
    screen: Containers.Login,
  },
  Home: {
    screen: Containers.Todo,
  },
  Register: {
    screen: Containers.Register,
  }
});

const App = createAppContainer(MainNavigator);

export default App;

