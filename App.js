import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Containers from './containers';

export default StackNavigator({
  Login: {
    screen: Containers.Login,
  },
  Home: {
    screen: Containers.Todo,
  },
  Register: {
    screen: Containers.Register,
  }
},
  {
    initialRouteName: 'Login',
  });