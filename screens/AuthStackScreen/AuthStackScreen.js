import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../components/Auth/SignIn/SignIn';
import SignUp from '../../components/Auth/SignUp/SignUp';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{title: 'Sign Up'}}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
