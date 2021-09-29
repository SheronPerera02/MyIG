import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import PostList from './PostList/PostList';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

const Posts = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const getAllPosts = () => {
    setRefreshing(true);
    props.onGetAllPosts(props.uid, setRefreshing);
  };

  React.useEffect(() => {
    props.onGetAllPosts(props.uid, setRefreshing);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getAllPosts} />
      }>
      <PostList posts={props.posts} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
    posts: state.home.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllPosts: (uid, setRefreshing) =>
      dispatch(actions.getAllPosts(uid, setRefreshing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
