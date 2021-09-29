import React from 'react';
import {Image, StyleSheet} from 'react-native';

const DP = props => {
  const newStyles = {};

  if (props.h) {
    newStyles.height = props.h;
  }

  if (props.w) {
    newStyles.width = props.w;
  }

  return props.dpUrl ? (
    <Image
      source={{uri: props.dpUrl}}
      style={{...styles.image, ...newStyles}}
    />
  ) : (
    <Image
      source={require('../../../assets/DefaultDP.png')}
      style={{...styles.image, ...newStyles}}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
});

export default DP;
