import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import WebView from 'react-native-webview';
import {loadMainPage} from '../..';
import {postLogin, putAuthHeader} from '../axiosInstance';
import style from '../style';

interface State {
  email: string;
  password: string;
  showCaptcha?: boolean;
  loggingIn?: boolean;
  errorMessage?: string;
}

export default class LoginScreen extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login(token: string) {
    this.setState({errorMessage: undefined});
    this.setState({loggingIn: true});
    postLogin(this.state.email, this.state.password, token)
      .then(async ({data}) => {
        await AsyncStorage.setItem('token', data.token);
        putAuthHeader();
        loadMainPage();
      })
      .catch((err) => {
        this.setState({loggingIn: false, showCaptcha: false});
        if (!err.response) {
          this.setState({errorMessage: 'No Internet Connection.'});
          return;
        }
        this.setState({errorMessage: err.response.data?.errors[0]?.msg});
      });
  }
  MainContent() {
    return (
      <View style={styleSheet.formContainer}>
        <Text style={[styleSheet.textColor, styleSheet.title]}>Login</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styleSheet.textInput}
          placeholder="Email"
          onChangeText={(text) => this.setState({email: text})}
          autoCompleteType="email"
          value={this.state.email}
        />
        <TextInput
          placeholderTextColor="gray"
          style={styleSheet.textInput}
          placeholder="Password"
          autoCompleteType="password"
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({password: text});
          }}
          secureTextEntry={true}
        />
        <View style={{margin: 10}}>
          <Button
            title="Login"
            onPress={() => this.setState({showCaptcha: true})}
          />
        </View>
      </View>
    );
  }
  HCaptcha() {
    return (
      <View style={styleSheet.formContainer}>
        <Text style={[styleSheet.textColor, styleSheet.title]}>
          Are you a bot?
        </Text>
        <WebView
          style={styleSheet.webView}
          scalesPageToFit={false}
          source={{
            uri: 'https://nertivia.supertiger.tk/android_captcha.html',
          }}
          onMessage={({nativeEvent}) => {
            this.login(nativeEvent.data);
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={[style.backgroundColor, styleSheet.container]}>
        <StatusBar
          backgroundColor={style.backgroundColor.backgroundColor}
          barStyle="light-content"
        />
        <Image style={styleSheet.logo} source={require('../assets/logo.png')} />
        {this.state.errorMessage && (
          <Text style={[style.alertColor, styleSheet.errorMessage]}>
            {this.state.errorMessage}
          </Text>
        )}
        {!this.state.showCaptcha && this.MainContent()}
        {!this.state.loggingIn && this.state.showCaptcha && this.HCaptcha()}
      </ScrollView>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  textColor: {
    color: 'white',
  },
  errorMessage: {
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
  },
  formContainer: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'stretch',
    flex: 1,
  },
  textInput: {
    backgroundColor: '#323b48',
    height: 40,
    borderRadius: 4,
    width: 250,
    margin: 5,
    color: 'white',
  },
  webView: {
    alignSelf: 'stretch',
    height: 500,
    width: 400,
  },
});
