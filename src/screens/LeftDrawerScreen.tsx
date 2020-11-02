import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RootStoreInterface, storeContext} from '../stores/RootStore';
import style from '../style';

@observer
export default class LeftDrawer extends Component {
  static contextType = storeContext;
  componentDidMount() {
    Navigation.showOverlay({
      component: {
        id: 'DRAWER_NAV',
        options: {
          statusBar: {
            drawBehind: true,
            backgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: false,
          },
        },
        name: 'com.nertivia.DrawerNav',
      },
    });
  }
  get store() {
    return this.context as RootStoreInterface;
  }
  get me() {
    return this.store.meStore.user;
  }
  render() {
    return (
      <View style={[style.backgroundColor, styleSheet.container]}>
        <SafeAreaView>
          <Text>{this.me?.username}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
});
