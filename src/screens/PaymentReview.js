import React, {Fragment} from 'react';
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
import {apiService} from '../services';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'dd',
      paymentAmount: '',
      profile_uuid: '',
    };
  }

  componentDidMount() {
    console.log('dfafdfdgdfsfd');
    const {route} = this.props;
    this.setState({profile_uuid: route.params.response.data.uuid});
  }

  handlePaymentAmount = text => {
    this.setState({paymentAmount: text});
  };

  handleContinue = async text => {
    console.log("clcicked");
    console.log("what can we do owowowo yes", this.state.profile_uuid);
    try {
      const response = await apiService.paymentAmount(
        this.state.profile_uuid,
        this.state.paymentAmount,
      );
      console.log('this is response data', response.data);
      this.props.navigation.navigate('Payment2', {response});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Payment Amount</Text>
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="$"
          id="paymentAmount"
          value={this.state.paymentAmount}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handlePaymentAmount}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleContinue}>
            Continue
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
    width: '80%',
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
    width: '80%',
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
