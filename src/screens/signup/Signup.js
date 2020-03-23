import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {signUp} from '../redux/actions/auth.action';

const width = '80%';

class Signup extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password1: '',
    password2: '',
    // b_invalid: false,
    // errMSG: {},
    errEmail: '',
    errPassword1: '',
    errPassword2: '',
  };

  handleFirstname = text => {
    this.setState({firstname: text});
  };

  handleLastname = text => {
    this.setState({lastname: text});
  };

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword1 = text => {
    this.setState({password1: text});
  };

  handlePassword2 = text => {
    this.setState({password2: text});
  };

  handleSignup = async () => {
    const {
      dispatch,
      navigation: {navigate},
    } = this.props;
    const {firstname, lastname, email, password1, password2} = this.state;
    try {
      const res = await dispatch(
        signUp(firstname, lastname, email, password1, password2),
      );
      if (res == 'suc') {
        navigate('Login');
      } else {
        // this.setState( {b_invalid: true} );
        this.setState({errEmail: res.email});
        this.setState({errPassword1: res.password1});
        this.setState({errPassword2: res.password2});
        console.log(res);
        // this.setState( {errMSG: res});
      }
    } catch (error) {}
  };

  render() {
    const {navigation, route, auth} = this.props;
    const {firstname, lastname, email, password1, password2} = this.state;
    console.log('PROPS AUTH', auth);
    return (
      <View style={styles.container}>
        {/* {this.state.b_invalid ? <Text style={{ fontSize: 20 }}>{this.state.errMSG.email} {this.state.errMSG.password1}</Text>  : <Text style={{ fontSize: 20 }}></Text>} */}
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="First name"
          id="firstname"
          value={firstname}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleFirstname}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Last name"
          id="lastname"
          value={lastname}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleLastname}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          id="email"
          value={email}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        {this.state.errEmail ? (
          <Text> {this.state.errEmail} </Text>
        ) : (
          <Fragment />
        )}
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password1"
          id="password1"
          value={password1}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword1}
        />
        {this.state.errPassword1 ? (
          <Text> {this.state.errPassword1} </Text>
        ) : (
          <Fragment />
        )}
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password2"
          id="password2"
          value={password2}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword2}
        />
        {this.state.errPassword2 ? (
          <Text> {this.state.errPassword2} </Text>
        ) : (
          <Fragment />
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <Text
            style={styles.signupButton}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </View>
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
    textAlign: 'center',
  },
  signupTextContainer: {
    //   flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 16,
    fontSize: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

const mapStateToProps = ({auth}) => {
  return {auth};
};

export default connect(mapStateToProps)(Signup);
