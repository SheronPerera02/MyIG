import firestore from '@react-native-firebase/firestore';

export const sendMessage = message => {
  firestore().collection('Messages').add(message);
};

let unsubscribe = null;

export const on = (callback, uid, receiverId) => {
  unsubscribe = firestore()
    .collection('Messages')
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (
          (change.doc.data().user._id === uid &&
            change.doc.data().receiver._id === receiverId) ||
          (change.doc.data().user._id === receiverId &&
            change.doc.data().receiver._id === uid)
        ) {
          callback({...change.doc.data()});
        }
      });
    });
};

export const off = () => {
  unsubscribe();
};
