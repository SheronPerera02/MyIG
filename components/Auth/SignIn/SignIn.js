import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Alert from '../../UI/Alert/Alert';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as actions from '../../../store/actions/index';

const SignIn = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onHideHandler = () => {
    setVisible(false);
  };

  const onSigninHandler = () => {
    props.onClearError();
    if (checkValidity()) {
      props.onAuth(null, email, password, false, () => {
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  };

  const checkValidity = () => {
    let isValid = true;

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

    return isValid;
  };

  return (
    <View style={{position: 'relative', flex: 1}}>
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
          placeholder="email"
          style={styles.textInput}
          selectionColor="#2196F3"
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="password"
            style={{...styles.textInput, marginBottom: 20}}
            selectionColor="#2196F3"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={val => setPassword(val)}
          />
          <Icon
            name={passwordVisible ? 'visibility-off' : 'visibility'}
            size={25}
            style={styles.visibilityIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={onSigninHandler}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>─ OR ─</Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={props.onAuthGoogle}>
          <FontAwesome name="google" size={22} style={{color: 'white'}} />
          <Text style={styles.googleButtonText}>Continue with google</Text>
        </TouchableOpacity>
        {/* <Button title="with google" onPress={props.onAuthGoogle} /> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.footerInnerText}
            onPress={() => props.navigation.push('SignUp')}>
            Sign Up
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
    marginBottom: 7,
    fontFamily: 'MadeTommy',
    width: '100%',
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
  loginButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 2,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MadeTommy',
    fontSize: 16,
  },
  orText: {
    fontFamily: 'MadeTommy',
    textAlign: 'center',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  googleButtonText: {
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
    onAuthGoogle: () => dispatch(actions.authGoogle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
