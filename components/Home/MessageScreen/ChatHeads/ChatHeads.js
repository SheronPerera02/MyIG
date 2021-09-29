import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatHeadList from './ChatHeadList/ChatHeadList';

const ChatHeads = props => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <Icon
          name="chat"
          size={30}
          style={styles.composeButton}
          onPress={() => props.navigation.push('ComposeChat')}
        />
      </View>
      <View style={styles.container}>
        <ChatHeadList navigation={props.navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  container: {
    width: '95%',
  },
  header: {
    height: 50,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    marginBottom: 20,
    height: 60,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    left: 15,
  },

  composeButton: {
    marginRight: 10,
  },
});

export default ChatHeads;
