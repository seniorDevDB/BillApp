import React, {Fragment} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {apiService} from '../../services';

const width = '80%';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    this.state = {
      url: '',
      b_progress_circle: true,
      profile_uuid: '',
    };
  }

  componentDidMount() {
    const {route} = this.props;
    console.log(route.params.responseJson.uuid);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({profile_uuid: route.params.responseJson.uuid});
  }

  handleURL = text => {
    this.setState({url: text});
  };

  handleMakePayment = async () => {
    console.log('make payment');
    try {
      const response = await apiService.makePayment(this.state.profile_uuid);
      console.log(response.data);
      if (response.data.res === 'success') {
        this.props.navigation.navigate('Payment1', {response});
      }
    } catch (error) {
      console.log('this is error');
      console.log(error);
    }
  };

  render() {
    const {navigation, route} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>
          {route.params.responseJson.billDate}
        </Text>
        <Text style={styles.textContainer}>
          ${route.params.responseJson.amount}
        </Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            disabled={this.state.b_disable}
            style={styles.buttonText}
            onPress={this.handleMakePayment}>
            Make a Payment
          </Text>
        </TouchableOpacity>
        {this.state.b_progress_circle ? (
          <AnimatedProgressWheel
            progress={100}
            animateFromValue={0}
            duration={10000}
            color={'white'}
            fullColor={'red'}
          />
        ) : (
          <Fragment />
        )}
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
  textContainer: {
    color: 'blue',
    fontSize: 20,
    marginTop: 5,
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
});
