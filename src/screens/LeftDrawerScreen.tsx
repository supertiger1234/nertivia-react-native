import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import DrawerSideBar from '../components/DrawerSideBar';
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
        <DrawerSideBar />
        <Text style={{color: 'white'}}>
          {/* {this.store.stateStore.selectedTab} */}
        </Text>
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
