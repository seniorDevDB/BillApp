import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { signIn, isSignedIn } from '../redux/actions/auth.action';

const width = '80%';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    errEmail: '',
    errPassword: '',
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }

  handleLogIn = async () => {
    const { dispatch, navigation: { navigate } } = this.props;
    const { email, password } = this.state;
    console.log("ddddddddddddddddddddd", email);
    try {
      console.log("ddddddddddddddddddddd");
      await dispatch(signIn(email, password));
      navigate("Home");
    } catch (error) {
      console.log("dddddddddddddddddssssss",error);
    }
  }

  async componentDidMount() {
    const { dispatch, navigation: { navigate }} = this.props;
    console.log("AUTH!!!!!!!!!!!!!!!!!!!!!:");
    try {
      await dispatch(isSignedIn());
      navigate("Home");
    } catch (error) {
      console.log("no token found, please sign in again.");
    }
  }

  render() {
    const { navigation, route, auth } = this.props;
    const { email, password, errEmail, errPassword } = this.state;
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          id="email"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleEmail}>
        </TextInput>
        <Text> {auth.errMsg.email} </Text>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          id="password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword}>
        </TextInput>
        <Text> {auth.errMsg.password} </Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleLogIn}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Text style={styles.signupButton} onPress={() => navigation.navigate("Signup")}>Signup</Text>
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
    paddingVertical: 13,
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);