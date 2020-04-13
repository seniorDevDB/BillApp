import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import { inputAmount } from '../../redux/actions/payment.actions';

const width = '80%';

class InputAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
        };
    }   

    componentDidMount() {
        const {route} = this.props;
    }
    
  handleAmount = text => {
    this.setState({amount: text});
  };

  handleDone = async () => {
    const {dispatch} = this.props;
    try {
      console.log('ddddddddddddddddddddd');
      await dispatch(inputAmount(this.state.amount));
      // navigate("Home");
    } catch (error) {
      console.log('dddddddddddddddddssssss', error);
    }

    // this.props.route.params.updateAmount(this.state.amount)
    this.props.navigation.navigate('BillPayment');
  }

  render() {
    const {navigation, route} = this.props;
    const {amount} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Amount"
          value={amount}
          id="amount"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleAmount}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleDone}>
            Done
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

export default connect(mapStateToProps)(InputAmount);
