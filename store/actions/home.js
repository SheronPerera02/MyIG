import * as actionTypes from '../../store/actions/actionTypes';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const addPost = ({
  media,
  uid,
  isImage,
  caption,
  setProgress,
  setVisible,
  clearFields,
}) => {
  return dispatch => {
    const ext = '.' + media.mime.split('/')[1];
    setProgress(0.25);
    if (isImage) {
      const reference = storage().ref(
        '/posts/images/' + uid + media.modificationDate + ext,
      );
      reference.putFile(media.path).then(() => {
        setProgress(0.5);
        reference.getDownloadURL().then(url => {
          setProgress(0.75);
          writePostRecord({
            url,
            uid,
            caption,
            setProgress,
            setVisible,
            clearFields,
            isImage,
          });
        });
      });
    } else {
      const reference = storage().ref(
        '/posts/videos/' + uid + media.modificationDate + ext,
      );
      reference.putFile(media.path).then(() => {
        setProgress(0.5);
        reference.getDownloadURL().then(url => {
          setProgress(0.75);
          writePostRecord({
            url,
            uid,
            caption,
            setProgress,
            setVisible,
            clearFields,
            isImage,
          });
        });
      });
    }
  };
};

const writePostRecord = fields => {
  console.log(fields.url);
  firestore()
    .collection('Posts')
    .add({
      uid: fields.uid,
      caption: fields.caption,
      url: fields.url,
      mediaType: fields.isImage ? 'image' : 'video',
    })
    .then(() => {
      fields.setProgress(1);
      fields.setVisible(false);
      fields.clearFields();
    });
};

const getAllUsersSuccess = users => {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users,
  };
};

export const getAllUsers = uid => {
  return dispatch => {
    firestore()
      .collection('Users')
      .where('uid', '==', uid)
      .get()
      .then(res => {
        const followingUsers = res.docs[0].data().followingUsers;
        firestore()
          .collection('Users')
          .where('uid', '!=', uid)
          .get()
          .then(res => {
            const users = [];
            res.docs.forEach(doc => {
              const data = doc.data();
              let following = false;
              for (let el of followingUsers) {
                if (data.uid === el) {
                  following = true;
                }
              }
              users.push({
                uid: data.uid,
                dpUrl: data.dpUrl,
                username: data.username,
                following,
              });
            });
            dispatch(getAllUsersSuccess(users));
          });
      });
  };
};

export const followUser = (uid, followingUserId) => {
  return dispatch => {
    firestore()
      .collection('Users')
      .where('uid', '==', uid)
      .get()
      .then(res => {
        const arr = [...res.docs[0].data().followingUsers];
        arr.push(followingUserId);
        firestore()
          .collection('Users')
          .doc(res.docs[0].id)
          .update({
            followingUsers: arr,
          })
          .then(() => {
            dispatch(getAllUsers(uid));
            dispatch(getComposeChatList(uid));
          });
      });
  };
};

export const unfollowUser = (uid, followingUserId) => {
  return dispatch => {
    firestore()
      .collection('Users')
      .where('uid', '==', uid)
      .get()
      .then(res => {
        const arr = [...res.docs[0].data().followingUsers];
        const newArr = arr.filter(el => {
          return el !== followingUserId;
        });
        firestore()
          .collection('Users')
          .doc(res.docs[0].id)
          .update({
            followingUsers: newArr,
          })
          .then(() => {
            dispatch(getAllUsers(uid));
            dispatch(getComposeChatList(uid));
          });
      });
  };
};

const getAllPostsSuccess = posts => {
  return {
    type: actionTypes.GET_ALL_POSTS_SUCCESS,
    posts,
  };
};

export const getAllPosts = (uid, setRefreshing) => {
  return dispatch => {

    firestore()
      .collection('Users')
      .where('uid', '==', uid)
      .get()
      .then(res => {

        if (res.docs[0].data().followingUsers.length > 0) {
          firestore()
            .collection('Users')
            .where('uid', 'in', res.docs[0].data().followingUsers)
            .get()
            .then(users => {
              firestore()
                .collection('Posts')
                .where('uid', 'in', res.docs[0].data().followingUsers)
                .get()
                .then(postsRes => {
                  const posts = [];
                  postsRes.docs.forEach(post => {
                    users.docs.forEach(user => {
                      const userData = user.data();

                      if (userData.uid !== post.data().uid) {
                        return;
                      }

                      posts.push({
                        ...post.data(),
                        dpUrl: userData.dpUrl,
                        username: userData.username,
                      });
                    });
                  });

                  dispatch(getAllPostsSuccess(posts));
                  setRefreshing(false);
                });
            });
        } else {
          dispatch(getAllPostsSuccess([]));
          setRefreshing(false);
        }
      });
  };
};

const getComposeChatListSuccess = composeChatList => {
  return {
    type: actionTypes.GET_COMPOSE_CHAT_LIST_SUCCESS,
    composeChatList,
  };
};

export const getComposeChatList = uid => {
  return dispatch => {
    firestore()
      .collection('Users')
      .where('uid', '==', uid)
      .get()
      .then(res => {
        const followingUsers = res.docs[0].data().followingUsers;

        if (followingUsers.length > 0) {
          firestore()
            .collection('Users')
            .where('uid', 'in', followingUsers)
            .get()
            .then(users => {
              const composeChatList = [];
              users.docs.forEach(doc => {
                const data = doc.data();
                composeChatList.push({
                  dpUrl: data.dpUrl,
                  uid: data.uid,
                  username: data.username,
                });
              });
              dispatch(getComposeChatListSuccess(composeChatList));
            });
        } else {
          dispatch(getComposeChatListSuccess([]));
        }
      });
  };
};

const getChatHeadListSuccess = chatHeadList => {
  return {
    type: actionTypes.GET_CHAT_HEAD_LIST_SUCCESS,
    chatHeadList,
  };
};

export const getChatHeadList = (uid, setRefreshing) => {
  return dispatch => {
    firestore()
      .collection('Messages')
      .where('user._id', '==', uid)
      .get()
      .then(res1 => {
        const ids = [];
        firestore()
          .collection('Messages')
          .where('receiver._id', '==', uid)
          .get()
          .then(res2 => {
            res1.docs.forEach(doc => {
              const data = doc.data();
              if (ids.indexOf(data.receiver._id) === -1) {
                ids.push(data.receiver._id);
              }
            });

            res2.docs.forEach(doc => {
              const data = doc.data();
              if (ids.indexOf(data.user._id) === -1) {
                ids.push(data.user._id);
              }
            });

            if (ids.length > 0) {
              firestore()
                .collection('Users')
                .where('uid', 'in', ids)
                .get()
                .then(users => {
                  const chatHeadList = [];
                  users.docs.forEach(doc => {
                    const data = doc.data();
                    chatHeadList.push({
                      dpUrl: data.dpUrl,
                      uid: data.uid,
                      username: data.username,
                    });
                  });
                  console.log(chatHeadList);
                  dispatch(getChatHeadListSuccess(chatHeadList));
                });
            } else{
              dispatch(getChatHeadListSuccess([]));
            }
            setRefreshing(false);
          });
      });
  };
};
