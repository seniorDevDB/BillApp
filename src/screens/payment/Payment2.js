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
import {ERR_KEYWORDS} from '../../constants';
import {apiService} from '../../services';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'dd',
      paymentAmount: '',
      profile_uuid: '',
      date: '02/15/20',
      data: [
        {
          label: 'Pay Today',
          value: '',
          color: '#1c313a',
          selected: true,
        },
        {
          label: 'Pay on Other Date',
          value: "I'm not same as label",
          color: '#1c313a',
        },
      ],
    };
  }

  componentDidMount() {
    console.log('dfafdfdgdfsfd');
    const {route} = this.props;
    console.log('here is date date date', this.state.date);
    console.log('here is what we can do', route.params.response.data.todayDate);
    this.setState({profile_uuid: route.params.response.data.uuid});
    this.setState({date: route.params.response.data.todayDate.split(': ')[1]});
    console.log(route.params.response.data.todayDate.split(': ')[1]);
    let temp = [...this.state.data];
    temp[0].label = route.params.response.data.todayDate;
    temp[1].label = route.params.response.data.otherDate;
    this.setState({data: temp});
  }

  handleBack = async () => {
    console.log('back clicked');
    try {
      const response = await apiService.paymentDateBack(
        this.state.profile_uuid,
      );
      console.log('wrherewalrjeklwjrfkdlsjfldjsafl', response.data);
      this.props.navigation.navigate('Payment1', {response});
    } catch (error) {
      console.log(error);
    }
  };

  handlePaymentDateContinue = async () => {
    try {
      const response = await apiService.paymentDate(
        this.state.profile_uuid,
        this.state.data[0].selected,
        this.state.date,
      );
      console.log('this is response data', response.data);
      if (response.data.res === 'date_success') {
        this.props.navigation.navigate('Payment3', {response});
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
    console.log('what can we do about this000', selectedButton);
    return (
      <View style={styles.container}>
        {/* <Text style={styles.valueText}>Value = {selectedButton}</Text> */}
        {selectedButton === this.state.data[0].value ? (
          <Text style={styles.textContainer}>
            Your payment will be processed Today. It may take up to 24 hours to
            post to your account.
          </Text>
        ) : (
          <Fragment />
        )}
        <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
        {selectedButton === this.state.data[1].value ? (
          <DatePicker
            style={styles.dateContainer}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="MM/DD/YY"
            minDate="01/01/19"
            maxDate="01/01/22"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />
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
            onPress={this.handlePaymentDateContinue}>
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
});
