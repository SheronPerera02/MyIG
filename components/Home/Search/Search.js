import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import SearchResultList from './SearchResultList/SearchResultList';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const Search = props => {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    props.onGetAllUsers(props.uid);
  }, []);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.seachInput}
          placeholder="Search"
          onChangeText={val => setText(val)}
          value={text}
          placeholderTextColor="#a3a2a2"
        />
        <SearchResultList
          users={props.users}
          uid={props.uid}
          filterText={text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    height: '100%',
  },
  seachInput: {
    backgroundColor: '#eee',
    borderRadius: 15,
    fontFamily: 'MadeTommy',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
    users: state.home.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllUsers: uid => dispatch(actions.getAllUsers(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
