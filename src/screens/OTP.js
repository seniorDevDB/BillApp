import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Text
} from 'react-native';

const width = '80%';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    thisstate = {
      code: '',
      profile_uuid: '',
    }
  }

  componentDidMount() {
    const {route} = this.props;
    console.log(route.params);
    this.setState({ profile_uuid: route.params.responseJson.uuid })
  }

  handleCode = (text) => {
    this.setState({ code: text })
  }

  handleSubmit = () => {
    const data = new FormData();
    data.append('code',this.state.code);
    data.append('uuid', this.state.profile_uuid);
    fetch('http://13.92.168.44:8000/api/opt/', {
      method: 'POST',
      body: data,
    })
    .then((response) => {console.log(response); return response.json()})
    .then((responseJson) => {
        console.log(responseJson);
        (responseJson.res == "ok") ? this.props.navigation.navigate("OTP") : this.props.navigation.navigate("Result");
    })
    .catch((error) => {
        console.log(error);
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Security PassCode"
          id="password"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleCode}>
        </TextInput>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleSubmit}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

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
    textAlign: "center",
  },
});

