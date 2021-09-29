import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';

import Posts from '../../../components/Home/Posts/Posts';
import MessageScreen from '../../../components/Home/MessageScreen/MessageScreen';
import NewPost from '../../../components/Home/NewPost/NewPost';
import Search from '../../../components/Home/Search/Search';
import ProfileScreen from '../../../components/Home/ProfileScreen/ProfileScreen';

const HomeTabs = createBottomTabNavigator();

const HomeTabsScreen = ({navigation}) => {
  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, []);

  return (
    <HomeTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      detachInactiveScreens={false}>
      <HomeTabs.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="favorite" size={26} />
              ) : (
                <Icon name="favorite-border" size={26} />
              )}
            </View>
          ),
        }}
      />
      <HomeTabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="saved-search" size={30} />
              ) : (
                <Icon name="search" size={30} />
              )}
            </View>
          ),
        }}
      />

      <HomeTabs.Screen
        name="NewPost"
        component={NewPost}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="add-circle" size={29} />
              ) : (
                <Icon name="add-circle-outline" size={29} />
              )}
            </View>
          ),
        }}
      />
      <HomeTabs.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="chat-bubble" size={25} />
              ) : (
                <Icon name="chat-bubble-outline" size={25} />
              )}
            </View>
          ),
        }}
      />

      <HomeTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="person" size={29} />
              ) : (
                <Icon name="person-outline" size={29} />
              )}
            </View>
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
};

export default HomeTabsScreen;
