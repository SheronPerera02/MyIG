import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Alert from '../../UI/Alert/Alert';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

const SignUp = props => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onHideHandler = () => {
    setVisible(false);
  };

  const onSignupHandler = () => {
    props.onClearError();
    if (checkValidity()) {
      props.onAuth(username, email, password, true, () => {
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  };

  const checkValidity = () => {
    let isValid = true;

    if (username.length < 3 && isValid) {
      isValid = false;
      setMessage('The username should have at least 3 characters');
    }

    const value = email;

    let atposition = value.indexOf('@');
    let dotposition = value.lastIndexOf('.');

    if (atposition === -1 && dotposition === -1 && isValid) {
      isValid = false;
      setMessage('The email you entered is invalid');
    }

    if (atposition !== -1 && dotposition !== -1) {
      if (
        (atposition < 1 ||
          dotposition < atposition + 2 ||
          dotposition + 2 >= value.length) &&
        isValid
      ) {
        isValid = false;
        setMessage('The email you entered is invalid');
      }
    }

    if (password.length !== 6 && isValid) {
      isValid = false;
      setMessage('The password should contain exactly 6 characters');
    }

    if (password !== confirmPassword && isValid) {
      isValid = false;
      setMessage('Passwords do not match');
    }

    return isValid;
  };

  return (
    <View style={{flex: 1}}>
      <Alert
        visible={visible}
        onHide={onHideHandler}
        title="Try Again!"
        message={
          props.error
            ? props.error.message
              ? props.error.message
              : 'Try again later'
            : message
        }
      />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Instagram</Text>
        <TextInput
          placeholder="username"
          style={styles.textInput}
          value={username}
          onChangeText={val => setUsername(val)}
          selectionColor="#2196F3"
          placeholderTextColor="#a3a2a2"
        />
        <TextInput
          placeholder="email"
          style={styles.textInput}
          value={email}
          onChangeText={val => setEmail(val)}
          selectionColor="#2196F3"
          placeholderTextColor="#a3a2a2"
        />
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="password"
            style={styles.textInput}
            value={password}
            onChangeText={val => setPassword(val)}
            secureTextEntry={!passwordVisible}
            selectionColor="#2196F3"
            placeholderTextColor="#a3a2a2"
          />

          <Icon
            name={passwordVisible ? 'visibility-off' : 'visibility'}
            size={25}
            style={styles.visibilityIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="confirm password"
            style={{...styles.textInput, marginBottom: 20}}
            value={confirmPassword}
            onChangeText={val => setConfirmPassword(val)}
            secureTextEntry={!confirmPasswordVisible}
            selectionColor="#2196F3"
            placeholderTextColor="#a3a2a2"
          />
          <Icon
            name={confirmPasswordVisible ? 'visibility-off' : 'visibility'}
            size={25}
            style={styles.visibilityIcon}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={onSignupHandler}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Have an account?{' '}
          <Text
            style={styles.footerInnerText}
            onPress={() => props.navigation.push('SignIn')}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: '88%',
    backgroundColor: 'white',
    padding: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Chriselda',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#eee',
    paddingLeft: 10,
    paddingRight: 50,
    marginBottom: 7,
    fontFamily: 'MadeTommy',
    width: '100%',
    color: 'black',
  },
  textInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  visibilityIcon: {
    position: 'absolute',
    right: 10,
    top: 25 / 2,
    color: 'grey',
  },
  signupButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 2,
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MadeTommy',
    fontSize: 16,
  },
  footer: {
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontFamily: 'MadeTommy',
  },
  footerInnerText: {
    color: '#2196F3',
  },
});

const mapStateToProps = state => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password, isSignUp, showDialog) =>
      dispatch(actions.auth(username, email, password, isSignUp, showDialog)),
    onClearError: () => dispatch(actions.authStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
