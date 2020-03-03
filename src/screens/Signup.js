import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

const width = '80%';

export default class Signup extends React.Component {

  state = {
    url: '',
  }

  handleURL = (text) => {
    this.setState({ url: text })
  }

  render() {
    const { navigation, route } = this.props;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 27 }}>
          Signup
        </Text>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="User ID"
          id="username"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleId}>
        </TextInput>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          id="email"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword}>
        </TextInput>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          id="password"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword}>
        </TextInput>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <Text style={styles.signupButton}>Sign in</Text>
        </View>
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
  textContainer: {
    color: 'blue',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: '#1c313a',
    borderRadius: 25,
    width: width,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: "center",
  },
  signupTextContainer: {
    //   flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 16,
    fontSize: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
});

