import React from 'react';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import {createStackNavigator} from '@react-navigation/stack';

const ProfileScreenStack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <ProfileScreenStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileScreenStack.Screen name="Profile" component={Profile} />
      <ProfileScreenStack.Screen name="Settings" component={Settings} />
    </ProfileScreenStack.Navigator>
  );
};

export default ProfileScreen;
