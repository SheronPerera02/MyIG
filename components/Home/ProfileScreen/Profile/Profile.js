import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfilePicture from '../../../UI/ProfilePicture/ProfilePicture';

import {connect} from 'react-redux';

const Profile = props => {
  return (
    <View style={styles.container}>
      <View style={styles.userDetailsContainer}>
        <View style={styles.userDetails}>
          <ProfilePicture dpUrl={props.dpUrl} username={props.username} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnEditProfile}>
            <Text style={styles.btnEditProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSettings}
            onPress={() => props.navigation.push('Settings')}>
            <Icon name="settings" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  userDetailsContainer: {
    width: '95%',
    display: 'flex',
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    marginTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    width: '95%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnEditProfile: {
    width: '88%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: '#eee',
  },
  btnEditProfileText: {
    textAlign: 'center',
    fontFamily: 'MadeTommy',
  },
  btnSettings: {
    width: '10%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    dpUrl: state.auth.dpUrl,
  };
};

export default connect(mapStateToProps)(Profile);
