import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabsScreen from './HomeTabsScreen/HomeTabsScreen';
import SetDPScreen from './SetDPScreen/SetDPScreen';

import {connect} from 'react-redux';

const HomeStack = createStackNavigator();

const HomeStackScreen = props => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={props.isNewUser ? 'SetDP' : 'Home'}>
      <HomeStack.Screen name="Home" component={HomeTabsScreen} />
      <HomeStack.Screen name="SetDP" component={SetDPScreen} />
    </HomeStack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    isNewUser: state.auth.isNewUser,
  };
};

export default connect(mapStateToProps)(HomeStackScreen);
