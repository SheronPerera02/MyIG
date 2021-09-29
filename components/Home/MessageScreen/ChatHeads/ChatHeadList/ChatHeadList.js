import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import ChatHeadListItem from './ChatHeadListItem/ChatHeadListItem';
import {connect} from 'react-redux';
import * as actions from '../../../../../store/actions/index';

const ChatHeadList = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const getChatHeadList = () => {
    setRefreshing(true);
    props.onGetChatHeadList(props.uid, setRefreshing);
  };

  React.useEffect(() => {
    props.onGetChatHeadList(props.uid, setRefreshing);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getChatHeadList} />
      }
      style={{height: '100%', backgroundColor: 'white'}}>
      {props.chatHeadList.map(item => (
        <ChatHeadListItem
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

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
    chatHeadList: state.home.chatHeadList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetChatHeadList: (uid, setRefreshing) =>
      dispatch(actions.getChatHeadList(uid, setRefreshing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeadList);
