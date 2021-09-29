import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import DP from '../../../../UI/DP/DP';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PostListItem = ({post}) => {
  const [captionLength, setCaptionLength] = React.useState(25);

  const caption = post.caption;

  const showcaseCaption = caption.substring(0, captionLength);

  const [spinnerVisible, setSpinnerVisible] = React.useState(false);

  const [pause, setPause] = React.useState(true);

  return (
    <View style={{marginBottom: 30}}>
      <View style={styles.header}>
        <DP w={30} h={30} dpUrl={post.dpUrl} />
        <Text style={styles.headerText}>{post.username}</Text>
      </View>
      {post.mediaType === 'image' ? (
        <Image
          source={{
            uri: post.url,
          }}
          style={{width: '100%', height: 500}}
        />
      ) : (
        <TouchableWithoutFeedback onPress={() => setPause(() => true)}>
          <View>
            <Video
              source={{
                uri: post.url,
              }} // Can be a URL or a local file.
              resizeMode="contain"
              playWhenInactive={false}
              onLoadStart={() => setSpinnerVisible(true)}
              onLoad={() => setSpinnerVisible(false)}
              onEnd={() => setPause(true)}
              paused={pause}
              playInBackground={false}
              style={{width: '100%', height: 500, backgroundColor: 'black'}}
            />

            {spinnerVisible ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={styles.spinner}
              />
            ) : null}
            {pause && !spinnerVisible ? (
              <View style={styles.playButton}>
                <Icon
                  name="play-circle-filled"
                  size={50}
                  color='white'
                  onPress={() => setPause(() => false)}
                />
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.caption}>
        <Text style={styles.captionText}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {showcaseCaption}
          {caption.length === showcaseCaption.length ? null : (
            <Text
              style={{color: 'grey'}}
              onPress={() => setCaptionLength(caption.length)}>
              ...more
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    marginBottom: 8,
  },
  headerText: {
    marginLeft: 8,
    fontFamily: 'MadeTommy',
  },
  caption: {
    padding: 15,
  },
  captionUsername: {
    fontWeight: 'bold',
  },
  captionText: {
    fontSize: 13,
    fontFamily: 'MadeTommy',
    lineHeight: 19,
  },
  spinner: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  playButton: {
    position: 'absolute',
    width: '100%',
    height: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostListItem;
