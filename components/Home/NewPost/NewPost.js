import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {ProgressBar, Colors} from 'react-native-paper';

const NewPost = props => {
  const [caption, setCaption] = React.useState('');

  const [isValid, setIsValid] = React.useState(false);

  const [progress, setProgress] = React.useState(0);

  const [visible, setVisible] = React.useState(false);

  const addVideoHandler = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {
        console.log(video);
        setVisible(true);
        props.onAddPost({
          media: video,
          uid: props.uid,
          isImage: false,
          caption,
          setProgress,
          setVisible,
          clearFields,
        });
      })
      .catch(() => {
        console.log('Error in add video');
      });
  };

  const addPhotoHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setVisible(true);
        props.onAddPost({
          media: image,
          uid: props.uid,
          isImage: true,
          caption,
          setProgress,
          setVisible,
          clearFields,
        });
      })
      .catch(err => {
        console.log('Error in add photo', err);
      });
  };

  const clearFields = () => {
    setCaption('');
    setIsValid(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write caption..."
          selectionColor="#2196F3"
          style={styles.caption}
          value={caption}
          onChangeText={val => {
            setCaption(val);
            setIsValid(val.length > 3);
          }}
        />
        <TouchableOpacity
          style={!isValid ? {...styles.button, opacity: 0.5} : styles.button}
          disabled={!isValid}
          onPress={addVideoHandler}>
          <Text style={styles.buttonText}>Add video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!isValid ? {...styles.button, opacity: 0.5} : styles.button}
          disabled={!isValid}
          onPress={addPhotoHandler}>
          <Text style={styles.buttonText}>Add Photo</Text>
        </TouchableOpacity>
        {visible ? (
          <ProgressBar
            progress={progress}
            color={Colors.blue200}
            style={{marginTop: 20}}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
  },
  caption: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#eee',
    paddingLeft: 10,
    fontFamily: 'MadeTommy',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 2,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MadeTommy',
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: fields => dispatch(actions.addPost(fields)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
