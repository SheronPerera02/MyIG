import React from 'react';
import {View} from 'react-native';
import PostListItem from './PostListItem/PostListItem';

const PostList = props => {
  return (
    <View style={{marginTop: 15}}>
      {props.posts.map((el, index) => {
        return <PostListItem key={index} post={el} />;
      })}
    </View>
  );
};

export default PostList;
