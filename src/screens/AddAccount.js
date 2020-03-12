import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/auth.action';

const width = '80%';

class AddAccount extends React.Component {

  state = {
    url: 'att.com',
  }

  handleURL = (text) => {
    this.setState({ url: text })

  }


  render() {
    const { navigation, auth } = this.props;

    return (
      <View style={styles.container}>
        <TextInput style={styles.inputContainer}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Enter bank name or sign-in URL"
          id="bankUrl"
          value= {this.state.url}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onChangeText={this.handleURL}>
        </TextInput>
        <TouchableOpacity  style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={() => {
              navigation.navigate("Connect");
            }}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

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
    textAlign: "center",
  },
});


const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AddAccount);