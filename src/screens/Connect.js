import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Button,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native';

const width = '80%';

export default class App extends React.Component {

    state = {
        id: '4196511828',
        password: 'T54dbTF67!',
        phone_number: '',
        b_credential: true,
    }

    handleId = (text) => {
        this.setState({ id: text });
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    handlePhoneNumber = (text) => {
        this.setState({ phone_number: text })
    }

    handleSubmit = () => {
        const data = new FormData();
        data.append('userId', this.state.id);
        data.append('password', this.state.password);
        data.append('phoneNumber', this.state.phone_number);
        // responseJson = {"amount": "377.03", "billDate": "Pay by Mar 17, 2020", "res": "success"};
        fetch('http://13.92.168.44:8000/api/startLogin/', {
            method: 'POST',
            body: data,
        })
            .then((response) => { console.log(response); return response.json() })
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.billDate);
                console.log(responseJson.amount);
                if (responseJson.res == "credentialInvalid") {
                    this.setState({ b_credential: false });
                }
                else if (responseJson.res == "code") {
                    this.props.navigation.navigate("OTP")
                }
                else if (responseJson.res == "error") {    // when error happends on the backend
                    console.log("error happened on the backend");
                }
                else if (responseJson.res == "api_error") {
                    Alert.alert(
                        //title
                        'Alert',
                        //body
                        'Api issue. Please Try Again.',
                        [
                            { text: 'Yes', onPress: () => console.log('Yes Pressed') },
                            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                        ],
                        { cancelable: false }
                        //clicking out side of alert will not cancel
                    );
                }
                else if (responseJson.res == "phoneNumber") {
                    this.props.navigation.navigate("PhoneNumber", { responseJson })
                }
                else {
                    this.props.navigation.navigate("Result", { responseJson })
                }
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(
                    //title
                    'Alert',
                    //body
                    'Please Try Again.',
                    [
                        { text: 'Yes', onPress: () => console.log('Yes Pressed') },
                        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                    ],
                    { cancelable: false }
                    //clicking out side of alert will not cancel
                );
            });
    }

    render() {
        const { navigation } = this.props;
        const invalidCredentialMessage = <Text style={styles.textContainer}> Be sure you enter a valid credentials. </Text>;
        const validCredential = <Text style={styles.textContainer}> Connect </Text>;
        return (
            <View style={styles.container}>
                <View>
                    {this.state.b_credential ? validCredential : invalidCredentialMessage}
                </View>
                <TextInput style={styles.inputContainer}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="User ID"
                    id="userId"
                    value={this.state.id}
                    placeholderTextColor="#ffffff"
                    autoCapitalize="none"
                    onChangeText={this.handleId}>
                </TextInput>
                <TextInput style={styles.inputContainer}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    id="password"
                    value={this.state.password}
                    placeholderTextColor="#ffffff"
                    autoCapitalize="none"
                    onChangeText={this.handlePassword}>
                </TextInput>
                <TextInput style={styles.inputContainer}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Phone Number"
                    id="phoneNumber"
                    placeholderTextColor="#ffffff"
                    autoCapitalize="none"
                    onChangeText={this.handlehandlePhoneNumberPassword}>
                </TextInput>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress={this.handleSubmit}>CONNECT</Text>
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
    textContainer: {
        fontSize: 20,
        color: "white",
    }
});

