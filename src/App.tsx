import React, {Component, useState} from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {socketInstance} from './socketio/socketIOInstance';
import style from './style';
// import MainNavigator from './MainNavigator';

export default class App extends Component {
  componentDidMount() {
    // StatusBar.setBackgroundColor('red');
    // connects
    socketInstance();
  }
  render() {
    return (
      <View style={[style.backgroundColor, styleSheet.container]}>
        <Text>hello</Text>
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default function App() {
//   const [token, setToken] = useState<string | null>(null);
//   const [loaded, setLoaded] = useState(false);
//   AsyncStorage.getItem('token').then((res) => {
//     setToken(res);
//     setLoaded(true);
//   });

//   if (!loaded) {
//     return <View />;
//   }
//   if (!token) {
//     return <LoginScreen />;
//   }

//   // return (
//   //   <NavigationContainer>
//   //     <Drawer.Navigator
//   //       initialRouteName="Home"
//   //       drawerContent={NotificationsScreen}>
//   //       <Drawer.Screen name="Home" component={HomeScreen} />
//   //       <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//   //     </Drawer.Navigator>
//   //   </NavigationContainer>
//   // );
// }

// export default function App() {
//   return (
//     <Provider rootStore={store}>
//       <Test />
//     </Provider>
//   );
// }
