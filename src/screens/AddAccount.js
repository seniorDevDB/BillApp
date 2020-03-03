import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/auth.action';

const width = '80%';

class AddAccount extends React.Component {

  state = {
    url: '',
  }

  handleURL = (text) => {
    this.setState({ url: text })
  }

  logOut = async () => {
    const { dispatch, navigation: { navigate } } = this.props;
    try {
      await dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
    navigate("Login");
  }

  render() {
    const { navigation, auth } = this.props;

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
          <Button
            onPress={this.logOut}
            title="Log Out"
            color="blue"
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


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AddAccount);