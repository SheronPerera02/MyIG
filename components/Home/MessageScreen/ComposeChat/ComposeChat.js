import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ComposeChatList from './ComposeChatList/ComposeChatList';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

const ComposeChat = props => {
  React.useEffect(() => {
    props.onGetComposeChatList(props.uid);
  }, []);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Message</Text>
      </View>
      <View style={styles.container}>
        <ComposeChatList
          navigation={props.navigation}
          composeChatList={props.composeChatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    marginBottom: 20,
    width: '100%',
    height: 60
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
  },
  parentContainer: {
    alignItems: 'center',
  },
  container: {
    width: '95%',
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
    composeChatList: state.home.composeChatList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetComposeChatList: uid => dispatch(actions.getComposeChatList(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposeChat);
