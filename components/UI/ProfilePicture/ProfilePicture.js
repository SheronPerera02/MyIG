import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const ProfilePicture = props => {
  return (
    <View style={styles.container}>
      {props.dpUrl ? (
        <Image source={{uri: props.dpUrl}} style={styles.image} />
      ) : (
        <Image
          source={require('../../../assets/DefaultDP.png')}
          style={styles.image}
        />
      )}
      <Text style={styles.username}>{props.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 110,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  username: {
    fontFamily: 'MadeTommy',
    fontSize: 13,
    marginTop: 8
  },
});

export default ProfilePicture;
