import React from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {on, sendMessage, off} from '../../../../firestore-chat';

const Chat = props => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    on(
      msgs => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, msgs),
        );
      },
      props.uid,
      props.route.params.uid,
    );
    return () => {
      off();
      setMessages([]);
    };
  }, []);

  const onSend = (msgs = []) => {
    let msg = {
      ...msgs[0],
      createdAt: new Date().getTime(),
      receiver: {_id: props.route.params.uid},
      user: {...msgs[0].user, name: props.username, avatar: props.dpUrl},
    };
    sendMessage(msg);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: props.uid,
        }}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.userId,
    dpUrl: state.auth.dpUrl,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps)(Chat);
