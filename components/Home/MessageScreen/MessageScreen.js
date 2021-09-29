import React from 'react';
import ChatHeads from './ChatHeads/ChatHeads';
import Chat from './Chat/Chat';
import ComposeChat from './ComposeChat/ComposeChat';
import {createStackNavigator} from '@react-navigation/stack';

const MessageStack = createStackNavigator();

const MessageScreen = () => {
  return (
    <MessageStack.Navigator screenOptions={{headerShown: false}}>
      <MessageStack.Screen name="ChatHeads" component={ChatHeads} />
      <MessageStack.Screen name="ComposeChat" component={ComposeChat} />
      <MessageStack.Screen name="Chat" component={Chat} />
    </MessageStack.Navigator>
  );
};

export default MessageScreen;
