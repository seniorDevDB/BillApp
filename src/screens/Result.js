import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const width = '80%';

export default class Result extends React.Component {
  state = {
    url: '',
  };

  handleURL = text => {
    this.setState({url: text});
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
});
