import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const Alert = props => {
  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={props.onHide}
        style={styles.dialog}>
        <Dialog.Title style={styles.title}>{props.title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.message}>{props.message}</Paragraph>
        </Dialog.Content>

        <Dialog.Actions>
          <TouchableOpacity onPress={props.onHide} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>OK</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
    borderRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'MadeTommy',
  },
  message: {
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'MadeTommy',
  },
  dismissButton: {
    width: '100%',
    padding: 10,
    borderTopWidth: 2,
    borderColor: '#eee',
    flex: 1,
    alignItems: 'center',
  },
  dismissButtonText: {
    fontFamily: 'MadeTommy',
  },
});

export default Alert;
