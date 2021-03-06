import React, {useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Message from '../interfaces/Message';
import {store} from '../stores/RootStore';
import AvatarTemplate from './AvatarTemplate';
import fullDate, {time} from '../utils/date';
export default React.memo(
  ({message, grouped}: {message: Message; grouped: boolean}) => {
    const isCreatedByMe =
      message.creator.uniqueID === store.meStore.user.uniqueID;

    const avatar = () => (
      <AvatarTemplate size={40} imageID={message.creator.avatar} key={0} />
    );

    const triangle = () => (
      <View
        style={[
          styleSheet.triangle,
          isCreatedByMe && styleSheet.reverseTriangle,
        ]}
        key={1}
      />
    );

    let el = [
      !grouped && avatar(),
      !grouped && triangle(),
      grouped && (
        <Text style={styleSheet.groupedTime} key={2}>
          {time(message.created)}
        </Text>
      ),
      <Bubble message={message} grouped={grouped} key={3} />,
      <MessageSide message={message} key={4} />,
    ];
    if (isCreatedByMe) {
      el = el.reverse();
    }

    const [moveDown] = useState(new Animated.Value(-50));

    Animated.timing(moveDown, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    return (
      <Pressable android_ripple={{color: 'rgba(255, 255, 255, 0.4)'}}>
        <Animated.View
          onLayout={(r) => {
            r.nativeEvent.layout;
          }}
          style={[
            {padding: 3, flexDirection: 'row'},
            isCreatedByMe && {justifyContent: 'flex-end'},
            {transform: [{translateX: moveDown}]},
          ]}>
          {el}
        </Animated.View>
      </Pressable>
    );
  },
);

const Bubble = ({message, grouped}: {message: Message; grouped: boolean}) => {
  const isCreatedByMe =
    message.creator.uniqueID === store.meStore.user.uniqueID;
  return (
    <View
      style={[
        styleSheet.bubble,
        isCreatedByMe && styleSheet.reverseBubble,
        grouped && styleSheet.groupedBubble,
      ]}>
      {!grouped && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styleSheet.username}>{message.creator.username}</Text>
          <Text style={styleSheet.time}>{fullDate(message.created)}</Text>
        </View>
      )}
      <Text style={{color: 'white'}}>{message.message}</Text>
    </View>
  );
};
const MessageSide = ({message}: {message: Message}) => {
  const icon = (() => {
    const sending = message.sending;
    if (sending === 0) {
      return 'query-builder';
    }
    if (message.timeEdited) {
      return 'edit';
    }
    if (sending === 1) {
      return 'done';
    }
    if (sending === 2) {
      return 'error-outline';
    }
    return undefined;
  })();
  return (
    <View style={{alignSelf: 'flex-end'}}>
      {icon && <Icon name={icon} color="white" />}
    </View>
  );
};

const styleSheet = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    padding: 3,
    flexShrink: 1,
    borderTopLeftRadius: 0,
    marginRight: 3,
  },
  reverseBubble: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 0,
    marginRight: 0,
    marginLeft: 3,
  },
  triangle: {
    alignSelf: 'flex-start',
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 0,

    borderBottomColor: 'transparent',
    borderBottomWidth: 6,

    borderRightColor: 'rgba(255,255,255,0.2)',
    borderRightWidth: 6,
  },
  reverseTriangle: {
    borderRightColor: 'transparent',
    borderRightWidth: 0,

    borderLeftColor: 'rgba(255,255,255,0.2)',
    borderLeftWidth: 6,
  },
  username: {fontWeight: 'bold', color: 'white'},
  time: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
    opacity: 0.8,
  },
  groupedTime: {
    width: 46,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
  },
  groupedBubble: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});
