import {autorun} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStoreInterface, storeContext} from '../stores/RootStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../style';
import config from '../config';

interface State {
  moveUpValue: Animated.Value;
}
@observer
export default class DrawerNav extends Component<any, State> {
  static contextType = storeContext;
  state: State = {
    moveUpValue: new Animated.Value(50),
  };
  disposeAutoRun: any;

  get store() {
    return this.context as RootStoreInterface;
  }
  get me() {
    return this.store.meStore.user;
  }
  get selectedTab() {
    return this.store.stateStore.selectedTab;
  }

  animateHide() {
    Animated.timing(this.state.moveUpValue, {
      toValue: 50,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  animateShow() {
    Animated.timing(this.state.moveUpValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  componentDidMount() {
    this.disposeAutoRun = autorun(() => {
      const isLeftDrawerVisible = this.store.stateStore.leftDrawerVisible;
      if (isLeftDrawerVisible) {
        this.animateShow();
      } else {
        this.animateHide();
      }
    });
  }
  componentWillUnmount() {
    this.disposeAutoRun();
  }

  render() {
    const Item = (props: {icon: string; name: string; selected?: boolean}) => {
      return (
        <View style={{overflow: 'hidden', borderRadius: 4}}>
          <Pressable
            android_ripple={{color: 'white'}}
            onPress={() => {
              this.store.stateStore.setSelectedTab(props.name);
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: props.selected
                ? style.primaryBoxColor.backgroundColor
                : '',
              height: 50,
              minWidth: 60,
              paddingLeft: 5,
              paddingRight: 5,
              opacity: props.selected ? 1 : 0.7,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name={props.icon} size={25} color="white" />
            <Text style={{color: 'white', fontSize: 12}}>{props.name}</Text>
          </Pressable>
        </View>
      );
    };
    const ProfileItem = (props: {selected?: boolean}) => {
      return (
        <View style={{overflow: 'hidden', borderRadius: 4}}>
          <Pressable
            android_ripple={{color: 'white'}}
            onPress={() => {}}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: props.selected
                ? style.primaryBoxColor.backgroundColor
                : '',
              height: 50,
              minWidth: 60,
              maxWidth: 100,
              paddingLeft: 5,
              paddingRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 26, height: 26, borderRadius: 26}}
              source={{
                uri: config.nertiviaCDN + this.me?.avatar,
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                opacity: props.selected ? 1 : 0.7,
              }}>
              {this.me?.username}
            </Text>
          </Pressable>
        </View>
      );
    };

    return (
      <Animated.View
        style={[
          styleSheet.container,
          {transform: [{translateY: this.state.moveUpValue}]},
        ]}>
        <Item icon="forum" name="DMs" selected={this.selectedTab === 'DMs'} />
        <Item
          icon="dns"
          name="Servers"
          selected={this.selectedTab === 'Servers'}
        />
        <View style={{flex: 1}} />
        {this.me && <ProfileItem />}
        <Item
          icon="settings"
          name="Settings"
          selected={this.selectedTab === 'Settings'}
        />
      </Animated.View>
    );
  }
}
const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: '#191e25',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
  },
});
