import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

const Settings = props => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={props.onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {width: '50%'},
  button: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#eee',
  },
  buttonText: {
    color: 'grey',
    textAlign: 'center',
    fontFamily: 'MadeTommy',
  },
});

export default connect(null, mapDispatchToProps)(Settings);
