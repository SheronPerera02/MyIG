import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import SearchResultItem from './SearchResultItem/SearchResultItem';
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';

const SearchResultList = props => {
  const onFollowHandler = followingUserId => {
    props.onFollowUser(props.uid, followingUserId);
  };

  const onUnfollowHandler = followingUserId => {
    props.onUnfollowUser(props.uid, followingUserId);
  };

  return (
    <ScrollView style={styles.container}>
      {props.users
        .filter(el => {
          return props.filterText === ''
            ? false
            : el.username.includes(props.filterText);
        })
        .map((el, index) => {
          return (
            <SearchResultItem
              key={index}
              username={el.username}
              following={el.following}
              dpUrl={el.dpUrl}
              onFollow={() => onFollowHandler(el.uid)}
              onUnfollow={() => onUnfollowHandler(el.uid)}
            />
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onFollowUser: (uid, followingUserId) =>
      dispatch(actions.followUser(uid, followingUserId)),
    onUnfollowUser: (uid, followingUserId) =>
      dispatch(actions.unfollowUser(uid, followingUserId)),
  };
};

export default connect(null, mapDispatchToProps)(SearchResultList);
