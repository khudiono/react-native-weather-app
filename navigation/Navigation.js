import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Weather from '../screens/Weather';
import Search from '../screens/Search';
import Home from '../screens/Home';

const AppNavigator = createStackNavigator({
  Home: { screen : Home},
  Search: { screen: Search},
  Weather: { screen: Weather},
}, {
  headerMode: 'none',
})

const App = createAppContainer(AppNavigator);

export default App;
