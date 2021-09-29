import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DP from '../../../../UI/DP/DP';

const SearchResultItem = props => {
  return (
    <View style={styles.container}>
      <DP dpUrl={props.dpUrl} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{props.username}</Text>
        {props.following ? (
          <Text style={styles.followingText}>Following</Text>
        ) : null}
      </View>
      {!props.following ? (
        <TouchableOpacity style={styles.btnFollow} onPress={props.onFollow}>
          <Text style={styles.btnFollowText}>Follow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnFollow} onPress={props.onUnfollow}>
          <Text style={styles.btnFollowText}>Unfollow</Text>
        </TouchableOpacity>
      )}
    </View>
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
  followingText: {
    fontFamily: 'MadeTommy',
    color: 'grey',
  },
  btnFollow: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 15,
    width: 100,
  },
  btnFollowText: {
    fontFamily: 'MadeTommy',
    textAlign: 'center',
  },
});

export default SearchResultItem;
