import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import DP from '../../../../../UI/DP/DP';

const ComposeChatListItem = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.push('Chat', {uid: props.uid})}>
      <View style={styles.container}>
        <DP dpUrl={props.dpUrl} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{props.username}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 15,
    fontFamily: 'MadeTommy',
  },
  username: {
    fontFamily: 'MadeTommy',
  },
});

export default ComposeChatListItem;
