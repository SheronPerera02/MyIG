import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthStackScreen from './AuthStackScreen/AuthStackScreen';
import HomeStackScreen from './HomeStackScreen/HomeStackScreen';

import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

const RootStack = createStackNavigator();

const RootStackScreen = props => {
  React.useEffect(() => {
    props.onTryAutoLogin();
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      {props.uid ? (
        <RootStack.Screen name="App" component={HomeStackScreen} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </RootStack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootStackScreen);
