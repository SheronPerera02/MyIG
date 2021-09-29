import React from 'react';
import {ScrollView} from 'react-native';
import ComposeChatLIstItem from './ComposeChatListItem/ComposeChatListItem';

const ComposeChatList = props => {
  return (
    <ScrollView>
      {props.composeChatList.map(item => (
        <ComposeChatLIstItem
          navigation={props.navigation}
          dpUrl={item.dpUrl}
          username={item.username}
          uid={item.uid}
          key={item.uid}
        />
      ))}
    </ScrollView>
  );
};

export default ComposeChatList;
