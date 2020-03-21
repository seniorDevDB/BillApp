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
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker';
import {ERR_KEYWORDS} from '../constants';
import {apiService} from '../services';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_uuid: '',
      card_number: '4403 9314 5598 8551',
      expiration_date: '03/23',
      routing_number: '',
      account_number: '',
      data: [
        {
          label: 'Credit/Debit Card',
          value: '',
          color: '#1c313a',
          selected: true,
        },
        {
          label: 'Checking Account',
          value: '',
          color: '#1c313a',
        },
        {
          label: 'Savings Account',
          value: '',
          color: '#1c313a',
        },
      ],
    };
  }

  componentDidMount() {
    const {route} = this.props;
    console.log('here is date date date', this.state.date);
    this.setState({profile_uuid: route.params.response.data.uuid});
  }

  handleBack = async () => {
    console.log('back clicked');
    try {
      const response = await apiService.paymentMethodBack(
        this.state.profile_uuid,
      );
      console.log('wrherewalrjeklwjrfkdlsjfldjsafl', response.data);
      this.props.navigation.navigate('PaymentReview', {response});
    } catch (error) {
      console.log(error);
    }
  };

  handlePaymentMethodContinue = async () => {
    if (this.state.data[0].selected) {
      var paymentMethod = {}; // we can encrypt info here
      paymentMethod.status = 'credit';
      paymentMethod.first = this.state.card_number;
      paymentMethod.second = this.state.expiration_date;
    } else if (this.state.data[1].selected) {
      var paymentMethod = {}; // we can encrypt info here
      paymentMethod.status = 'checking';
      paymentMethod.first = this.state.routing_number;
      paymentMethod.second = this.state.account_number;
    } else if (this.state.data[2].selected) {
      var paymentMethod = {}; // we can encrypt info here
      paymentMethod.status = 'savings';
      paymentMethod.first = this.state.routing_number;
      paymentMethod.second = this.state.account_number;
    }
    console.log('method clicked dd', paymentMethod);
    try {
      const response = await apiService.paymentMethod(
        this.state.profile_uuid,
        paymentMethod,
      );
      console.log('this is response data', response.data);
      if (response.data.res === 'method_success') {
        this.props.navigation.navigate('PaymentReview');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update state
  onPress = data => this.setState({data});

  render() {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.data[0].label;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Payment Method</Text>
        <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
        {this.state.data[0].selected ? (
          <View style={styles.textinputContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Card Number"
                id="cardNumber"
                value={this.state.card_number}
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                onChangeText={text => this.setState({card_number: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Expiration Date MM/YY"
                id="expirationDate"
                value={this.state.expiration_date}
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                onChangeText={text => this.setState({expiration_date: text})}
              />
            </View>
          </View>
        ) : (
          <Fragment />
        )}
        {this.state.data[1].selected ? (
          <View style={styles.textinputContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Routing Number"
                id="routingNumber"
                value={this.state.routing_number}
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                onChangeText={text => this.setState({routing_number: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Account Number"
                id="accountNumber"
                value={this.state.account_number}
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                onChangeText={text => this.setState({account_number: text})}
              />
            </View>
          </View>
        ) : (
          <Fragment />
        )}
        {this.state.data[2].selected ? (
          <View style={styles.textinputContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Routing Number"
                value={this.state.routing_number}
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                onChangeText={text => this.setState({routing_number: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Account Number"
                value={this.state.account_number}
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                onChangeText={text => this.setState({account_number: text})}
              />
            </View>
          </View>
        ) : (
          <Fragment />
        )}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleBack}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.buttonText}
            onPress={this.handlePaymentMethodContinue}>
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
  dateContainer: {
    width: 180,
    marginTop: 10,
  },
  textContainer: {
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    fontSize: 14,
  },
  textinputContainer: {
    width: '87%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
});
