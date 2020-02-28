import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Button,
} from 'react-native';

const width = '80%';

export default class App extends React.Component {

    state = {
        id: '',
        password: '',
        phone_number: '',
    }

    handleId = (text) => {
        this.setState({ id: text })
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
        fetch('http://13.92.168.44:8000/api/test/', {
            method: 'POST',
            body: data,
        })
            .then((response) => { console.log(response); return response.json() })
            .then((responseJson) => {
                console.log(responseJson);
                (responseJson.res == "code") ? this.props.navigation.navigate("OTP") : this.props.navigation.navigate("Result");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <TextInput style={styles.inputContainer}
                    underlineColorAndroid="transparent"
                    placeholder="User ID"
                    id="userId"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleId}>
                </TextInput>
                <TextInput style={styles.inputContainer}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    id="password"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handlePassword}>
                </TextInput>
                <TextInput style={styles.inputContainer}
                    underlineColorAndroid="transparent"
                    placeholder="Phone Number"
                    id="phoneNumber"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handlePhoneNumber}>
                </TextInput>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.handleSubmit}
                        title="Connect"
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
        marginTop: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonContainer: {
        marginTop: 20,
    }
});

