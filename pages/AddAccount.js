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

    render(){
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputContainer}
                           underlineColorAndroid = "transparent"
                           placeholder = "Enter bank name or sign-in URL"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handleURL}>                        
                </TextInput>
                <View>
                  <Button style={styles.buttonContainer}
                    onPress={() => {
                      alert('You tapped the button!');
                    }}
                    title="Next"
                  />
                </View>
            </View>      
    );
    }

};

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    width: 100,
    height:50,
    backgroundColor:'red',
  }
});

