import * as actionTypes from './actionTypes';
import authFirebase from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '760635214600-bo6brmmjktmd2vc3hlfbj345ju48ool1.apps.googleusercontent.com',
});

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const storeUser = async obj => {
  try {
    await AsyncStorage.setItem('my_ig_user', JSON.stringify(obj));
  } catch (e) {
    // saving error
  }
};

const authSuccess = (userId, isNewUser, username, dpUrl) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    isNewUser,
    username,
    dpUrl,
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (username, email, password, isSignUp, showDialog) => {
  return dispatch => {
    dispatch(authStart());
    if (isSignUp) {
      authFirebase()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User account created & signed in!', res);

          firestore()
            .collection('Users')
            .add({
              username,
              uid: res.user.uid,
              followingUsers: [],
            })
            .then(() => {
              dispatch(
                authSuccess(
                  res.user.uid,
                  res.additionalUserInfo.isNewUser,
                  username,
                  null,
                ),
              );
              storeUser({uid: res.user.uid, username});
            });
        })
        .catch(error => {
          let err = {};
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            err.message = 'That email address is already in use';
          } else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            err.message = 'That email address is invalid';
          } else if (error.code === 'auth/network-request-failed') {
            console.log('Check your internet connection!');
            err.message = 'Check your internet connection';
          } else {
            console.error(error);
            err = error;
          }
          dispatch(authFail(err));
          showDialog();
        });
    } else {
      authFirebase()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User signed in!', res);
          firestore()
            .collection('Users')
            .where('uid', '==', res.user.uid)
            .get()
            .then(users => {
              const data = users.docs[0].data();

              dispatch(
                authSuccess(
                  res.user.uid,
                  res.additionalUserInfo.isNewUser,
                  data.username,
                  data.dpUrl,
                ),
              );
              storeUser({
                uid: res.user.uid,
                username: data.username,
                dpUrl: data.dpUrl,
              });
            });
        })
        .catch(error => {
          console.log(error);
          let err = {};
          if (error.code === 'auth/user-not-found') {
            console.log('User not found!');
            err.message = 'Invalid credentials';
          } else if (error.code === 'auth/wrong-password') {
            console.log('Password is invalid!');
            err.message = 'Invalid credentials';
          } else if (error.code === 'auth/network-request-failed') {
            console.log('Check your internet connection!');
            err.message = 'Check your internet connection';
          } else {
            console.error(error);
            err = error;
          }
          dispatch(authFail(err));
          showDialog();
        });
    }
  };
};

const signinWithGoogle = async () => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = authFirebase.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return authFirebase().signInWithCredential(googleCredential);
};

export const authGoogle = () => {
  return dispatch => {
    signinWithGoogle()
      .then(res => {
        console.log('Success!', res);
        if (res.additionalUserInfo.isNewUser) {
          firestore().collection('Users').add({
            uid: res.user.uid,
            username: res.user.displayName,
            followingUsers: [],
          });
        }

        firestore()
          .collection('Users')
          .where('uid', '==', res.user.uid)
          .get()
          .then(user => {
            dispatch(
              authSuccess(
                res.user.uid,
                res.additionalUserInfo.isNewUser,
                user.docs[0].data().username,
                user.docs[0].data().dpUrl,
              ),
            );
            storeUser({
              uid: res.user.uid,
              username: user.docs[0].data().username,
              dpUrl: user.docs[0].data().dpUrl,
            });
          });
      })
      .catch(error => console.log(error));
  };
};

const deleteUser = async () => {
  try {
    await AsyncStorage.removeItem('my_ig_user');
  } catch (e) {
    // saving error
  }
};

export const authLogout = () => {
  deleteUser();
  authFirebase()
    .signOut()
    .then(() => console.log('Signed out!'));
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('my_ig_user');
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
  }
};

export const tryAutoLogin = () => {
  return dispatch => {
    getUser().then(objString => {
      if (objString) {
        const user = JSON.parse(objString);
        console.log(user);
        dispatch(
          authSuccess(
            user.uid,
            false,
            user.username,
            user.dpUrl ? user.dpUrl : null,
          ),
        );
      }
    });
  };
};

export const addDp = (img, uid) => {
  return dispatch => {
    const imageExt = img.mime.split('image/')[1];
    const reference = storage().ref('/dps/' + uid + '.' + imageExt);
    reference.putFile(img.path).then(() => {
      reference.getDownloadURL().then(url => {
        dispatch(updateDp(url, uid));
      });
    });
  };
};

const updateDp = (downloadUrl, uid) => {
  return dispatch => {
    firestore()
      .collection('Users')
      .where('uid', '==', uid)
      .get()
      .then(res => {
        firestore()
          .collection('Users')
          .doc(res.docs[0].id)
          .update({
            dpUrl: downloadUrl,
          })
          .then(() => {
            dispatch(setDpUrl(downloadUrl));
          });
      });
  };
};

const setDpUrl = url => {
  AsyncStorage.getItem('my_ig_user').then(userString => {
    const user = JSON.parse(userString);
    user.dpUrl = url;
    AsyncStorage.setItem('my_ig_user', JSON.stringify(user));
  });
  return {
    type: actionTypes.SET_DP_URL,
    url,
  };
};
