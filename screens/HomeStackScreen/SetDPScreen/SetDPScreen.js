import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const SetDPScreen = props => {
  React.useEffect(() => {
    if (props.dpUrl) {
      props.navigation.push('Home');
    }
  }, [props.dpUrl]);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      props.onAddDp(image, props.uid);
    });
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} name="camera" size={100} />
        </View>
        <Text style={styles.title}>Add profile photo</Text>
        <Text style={styles.text}>
          Add a profile photo so that your friends know it's you
        </Text>
        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={openImagePicker}>
          <Text style={styles.addPhotoButtonText}>Add a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => props.navigation.push('Home')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '85%',
    alignItems: 'center',
    marginTop: 60,
  },
  iconContainer: {
    borderWidth: 8,
    borderRadius: 125 / 2,
  },
  icon: {
    padding: 25,
  },
  title: {
    fontSize: 30,
    padding: 10,
    fontFamily: 'MadeTommy',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    color: 'grey',
    padding: 5,
    fontFamily: 'MadeTommy',
  },
  addPhotoButton: {
    backgroundColor: '#2196F3',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  addPhotoButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'MadeTommy',
  },
  skipButton: {
    width: '100%',
    padding: 15,
    marginTop: 10,
  },
  skipButtonText: {
    color: '#2196F3',
    fontFamily: 'MadeTommy',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
    dpUrl: state.auth.dpUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddDp: (image, uid) => dispatch(actions.addDp(image, uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetDPScreen);
