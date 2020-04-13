import React, {Component, Fragment} from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Entypo';
import {apiService} from '../services';
// import {connect} from 'react-redux';
// import {bill_login} from '../../redux/actions/bill_login.action';

export default class SiteLoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '4196511828',
      password: 'T54dbTF67!',
      b_progress_circle: false,
    };
  }

  handleLogIn = async (site, username, password) => {
    console.log(site, username, password);
    this.setState({b_progress_circle: true});
    try {
      const response = await apiService.startLogin(site, username, password);
      const responseJson = response.data;

      console.log(responseJson);
      console.log(responseJson.billDate);
      console.log(responseJson.amount);
      if (responseJson.res == 'credentialInvalid') {
        this.setState({b_disable: false});
        this.setState({b_credential: false});
      // } else if (responseJson.res == ERR_KEYWORDS.DO_INITIAL_CONNECTION) {
      //   this.handleAlert(ERR_KEYWORDS.DO_INITIAL_CONNECTION);
      // } else if (responseJson.res == ERR_KEYWORDS.REFRESHCONNECTION_ERROR) {
      //   this.handleAlert('You have to do initial connection');
      // } else if (responseJson.res == ERR_KEYWORDS.INITIALCONNECTION_ERROR) {
      //   this.handleAlert(ERR_KEYWORDS.INITIALCONNECTION_ERROR);
      // } else if (responseJson.res == 'error') {
      //   // when error happends on the backend
      //   console.log('error happened on the backend');
      // } else if (responseJson.res == 'api_error') {
      //   Alert.alert(
      //     //title
      //     'Alert',
      //     //body
      //     'Api issue. Please Try Again.',
      //     [
      //       {text: 'Yes', onPress: () => console.log('Yes Pressed')},
      //       {
      //         text: 'No',
      //         onPress: () => console.log('No Pressed'),
      //         style: 'cancel',
      //       },
      //     ],
      //     {cancelable: false},
      //     //clicking out side of alert will not cancel
      //   );
       } 
      else if (responseJson.res == 'phoneNumber') {
        console.log("phone number is called here");
        this.props.toggleModal();
        this.setState({b_progress_circle: false});
        this.props.navigation.navigate('PhoneNumber', {responseJson});
       } 
       //else if (responseJson.billDate == ERR_KEYWORDS.GET_PHONENUMBER_ERROR) {
      //   this.handleAlert(ERR_KEYWORDS.GET_PHONENUMBER_ERROR);
      //} 
      else if (responseJson.res === 'success') {
        console.log('here we want this ssss');
        this.setState({b_progress_circle: false});
        this.props.navigation.navigate('Bill', {site});
      } else {
        // this.props.navigation.navigate('Result', {responseJson});
        console.log('this is else');
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleAlert = words => {
    Alert.alert(
      //title
      'Alert',
      //body
      words,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('initial connection error');
          },
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  render() {
    const {
      background,
      isModalVisible,
      children,
      site,
      username,
      password,
    } = this.props;
    console.log('1717171717171717117171717', this.props);
    return (
      <View style={{flex: 1}}>
        {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              backgroundColor: background,
              // alignItems: 'center',
            }}>
            <Icon
              name="cross"
              size={25}
              color="#fff"
              style={styles.iconContainer}
              onPress={this.props.toggleModal}
            />
            <Text style={styles.titleText}>Enter your login details</Text>
            <View>{children}</View>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={styles.buttonText}
                onPress={() => this.handleLogIn(site, username, password)}>
                Login
              </Text>
            </TouchableOpacity>
            {this.state.b_progress_circle ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Fragment />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

{
  /* <ModalTester backColor logo isVisible={true}>
    <input></input>
    <input></input>
</Modal> */
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#859aa4',
    borderRadius: 25,
    width: '80%',
    marginVertical: 10,
    paddingVertical: 13,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    color: '#fff',
    paddingBottom: 50,
  },
  iconContainer: {
    marginLeft: 'auto',
    marginTop: 10,
    marginRight: 10,
  },
});
