import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {signIn, isSignedIn} from '../../redux/actions/auth.action';
import { billAccountInfo } from '../../redux/actions/payment.actions';

const width = '80%';

class CreditVisa extends React.Component {
  state = {
    card_number: '',
    expiration_date: '',
    security_code: '',
    zip_code: '',
  };

  handleCardNumber = text => {
    this.setState({card_number: text});
  };

  handleExpirationDate = text => {
    this.setState({expiration_date: text});
  };

  handleSecurityCode = text => {
    this.setState({security_code: text});
  };

  handleZipCode = text => {
    this.setState({zip_code: text});
  };

  handleAddAccount= async () => {
    console.log("andle add account called");
    const {dispatch} = this.props;
    try {
      console.log('ddddddddddddddddddddd');
      await dispatch(billAccountInfo(this.state.card_number, this.state.expiration_date, this.state.security_code, this.state.zip_code));
      // navigate("Home");
    } catch (error) {
      console.log('dddddddddddddddds', error);
    }

    // this.props.route.params.updateAccountTypeInfo(this.state.card_number, this.state.expiration_date);
    this.props.navigation.navigate('BillPayment');
  }

  render() {
    // const {navigation, route} = this.props;
    const {routing_number, account_number} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Card Number"
          value={routing_number}
          id="card_number"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleCardNumber}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Expiration Date"
          id="expiration_date"
          value={account_number}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleExpirationDate}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Security Code"
          id="security_code"
          value={account_number}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleSecurityCode}
        />
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Zip Code"
          id="zip_number"
          value={account_number}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleZipCode}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleAddAccount}>
            Add Account
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

const mapStateToProps = ({payment}) => ({payment});

export default connect(mapStateToProps)(CreditVisa);

