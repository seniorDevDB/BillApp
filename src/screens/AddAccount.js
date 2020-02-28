import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button
} from 'react-native';

const width = '80%';

export default class App extends React.Component {

  state = {
    url: '',
  }

  handleURL = (text) => {
    this.setState({ url: text })
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="transparent"
          placeholder="Enter bank name or sign-in URL"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleURL}>
        </TextInput>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate("Connect");
            }}
            title="Next"
            color="red"
          />
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: width,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  }
});

