/* eslint-disable eqeqeq */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ERR_KEYWORDS} from '../constants';

const width = '80%';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '4196511828',
      password: 'T54dbTF67!',
      phone_number: '',
      site_url: props.route.params.url,
      b_credential: true,
      b_disable: false,
    };
  }

  componentDidMount() {
    console.log("dfafdfdgdfsfd", ERR_KEYWORDS);
  }

  handleId = text => {
    this.setState({id: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  handlePhoneNumber = text => {
    this.setState({phone_number: text});
  };

  handleSubmit = () => {
    this.setState({b_disable: true});
    console.log('okokok');
    const data = new FormData();
    data.append('userId', this.state.id);
    data.append('password', this.state.password);
    data.append('phoneNumber', this.state.phone_number);
    data.append('siteUrl', this.state.site_url);
    // responseJson = {"amount": "377.03", "billDate": "Pay by Mar 17, 2020", "res": "success"};
    fetch('http://13.92.168.44:8000/api/startLogin/', {
      method: 'POST',
      body: data,
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        console.log(responseJson.billDate);
        console.log(responseJson.amount);
        if (responseJson.res == 'credentialInvalid') {
          this.setState({b_disable: false});
          this.setState({b_credential: false});
        } else if (responseJson.res == ERR_KEYWORDS.DO_INITIAL_CONNECTION) {
          Alert.alert(
            //title
            'Alert',
            //body
            'It will ask OTP again.',
            [{text: 'OK', onPress: () => console.log('Yes Pressed')}],
            {cancelable: false},
            //clicking out side of alert will not cancel
          );
        } else if (responseJson.res == ERR_KEYWORDS.INITIALCONNECTION_ERROR) {
          this.handleAlert(ERR_KEYWORDS.INITIALCONNECTION_ERROR);
        } else if (responseJson.res == 'error') {
          // when error happends on the backend
          this.setState({b_disable: false});
          console.log('error happened on the backend');
        } else if (responseJson.res == 'api_error') {
          this.setState({b_disable: false});
          Alert.alert(
            //title
            'Alert',
            //body
            'Api issue. Please Try Again.',
            [
              {text: 'Yes', onPress: () => console.log('Yes Pressed')},
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
            //clicking out side of alert will not cancel
          );
        } else if (responseJson.res == 'phoneNumber') {
          this.setState({b_disable: false});
          this.props.navigation.navigate('PhoneNumber', {responseJson});
        } else if (
          responseJson.billDate == ERR_KEYWORDS.GET_PHONENUMBER_ERROR
        ) {
          this.handleAlert(ERR_KEYWORDS.GET_PHONENUMBER_ERROR);
        } else {
          this.setState({b_disable: false});
          this.props.navigation.navigate('Result', {responseJson});
        }
      })
      .catch(error => {
        this.setState({b_disable: false});
        console.log(error);
        Alert.alert(
          //title
          'Alert',
          //body
          'Please Try Again.',
          [
            {text: 'Yes', onPress: () => console.log('Yes Pressed')},
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        );
      });
  };

  handleAlert = words => {
    Alert.alert(
      //title
      'Alert',
      //body
      words,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log("initial connection error");
          },
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  render() {
    const {navigation, route} = this.props;
    const invalidCredentialMessage = (
      <Text style={styles.textContainer}>
        {' '}
        Be sure you enter a valid credentials.{' '}
      </Text>
    );
    const validCredential = (
      <Text style={styles.textContainer}> {route.params.url} </Text>
    );
    return (
      <View style={styles.container}>
        <View>
          {this.state.b_credential ? validCredential : invalidCredentialMessage}
        </View>
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="User ID"
          id="userId"
          value={this.state.id}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleId}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          id="password"
          value={this.state.password}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Phone Number"
          id="phoneNumber"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlehandlePhoneNumberPassword}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            disabled={this.state.b_disable}
            style={styles.buttonText}
            onPress={this.handleSubmit}>
            CONNECT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: width,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#1c313a',
    borderRadius: 25,
    width: width,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  textContainer: {
    fontSize: 20,
    color: 'white',
  },
});
