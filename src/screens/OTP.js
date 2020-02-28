import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button
} from 'react-native';

const width = '80%';

export default class App extends React.Component {

  state = {
    code: '',
  }

  handleCode = (text) => {
    this.setState({ code: text })
  }

  handleSubmit = () => {
    const data = new FormData();
    data.append('code',this.state.code);
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
          underlineColorAndroid="transparent"
          placeholder="Security PassCode"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleCode}>
        </TextInput>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonContainer}
            onPress={this.handleSubmit}
            title="Next"
          />
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: width,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop:20,
  }
});

