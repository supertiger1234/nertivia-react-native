import {autorun} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {RootStoreInterface, storeContext} from '../stores/RootStore';
import DrawerNavItem from './DrawerNavItem';
import DrawerNavProfileItem from './DrawerNavProfileItem';

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
    return (
      <Animated.View
        style={[
          styleSheet.container,
          {transform: [{translateY: this.state.moveUpValue}]},
        ]}>
        <DrawerNavItem icon="forum" name="DMs" selected={this.selectedTab} />
        <DrawerNavItem icon="dns" name="Servers" selected={this.selectedTab} />
        <View style={{flex: 1}} />
        {this.me && <DrawerNavProfileItem me={this.me} />}
        <DrawerNavItem
          icon="settings"
          name="Settings"
          selected={this.selectedTab}
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
