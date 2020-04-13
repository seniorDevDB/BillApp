import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {ERR_KEYWORDS} from '../../constants';
import {connect} from 'react-redux';

const width = '80%';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    this.state = {
      code: '',
      profile_uuid: '',
      b_progress_circle: false,
    };
  }

  componentDidMount() {
    const {route} = this.props;
    console.log(route.params.responseJson.uuid);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({profile_uuid: route.params.responseJson.uuid});
  }

  handleCode = text => {
    this.setState({code: text});
  };

  handleSubmit = () => {
    this.setState({b_progress_circle: true});
    const data = new FormData();
    data.append('code', this.state.code);
    data.append('uuid', this.state.profile_uuid);
    data.append('username', "4196511828");
    fetch('http://13.92.168.44:8000/api/opt/', {
      method: 'POST',
      body: data,
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        // responseJson.res == 'ok'
        //   ? this.props.navigation.navigate('OTP', {responseJson})
        //   : this.props.navigation.navigate('Result', {responseJson});
        if (responseJson.res == ERR_KEYWORDS.GET_BALANCE_SUCCESS) {
          this.setState({b_progress_circle: false});
          // this.props.navigation.navigate('Result', {responseJson});
          this.props.navigation.navigate('Bill');
        } else if (responseJson.res == ERR_KEYWORDS.OTP_LOADING_ERROR) {
          this.setState({b_progress_circle: false});
          this.handleAlert(ERR_KEYWORDS.OTP_LOADING_ERROR);
        } else if (responseJson.res == ERR_KEYWORDS.INVALID_OTP) {
          this.handleAlert(ERR_KEYWORDS.INVALID_OTP);
          this.setState({b_progress_circle: false});
        } else {
          //ERR_KEYWORDS.BALANCE_ERROR
          this.setState({b_progress_circle: false});
          this.handleAlert();
        }
      })
      .catch(error => {
        console.log(error);
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
            this.props.navigation.navigate('Connect');
          },
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Security PassCode"
          id="password"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleCode}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleSubmit}>
            NEXT
          </Text>
        </TouchableOpacity>
        {this.state.b_progress_circle ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Fragment />
            )}
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
});
