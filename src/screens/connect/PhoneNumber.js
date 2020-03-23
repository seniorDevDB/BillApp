import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {ERR_KEYWORDS} from '../constants';

export default class PhoneNumber extends React.Component {
  // state = {
  //     data: [
  //         {
  //             label: '123------------3123',
  //             id: 'phone1'
  //         },
  //         {
  //             label: '123------------6834',
  //             id: 'phone2',
  //         },
  //         {
  //             label: '123------------9365',
  //             id: 'phone3',
  //         },
  //         {
  //             label: '123------------5263',
  //             id: 'phone8',
  //         },
  //         {
  //             label: '123------------9934',
  //             id: 'phone4',
  //         },
  //         {
  //             label: '123------------1723',
  //             id: 'phone5',
  //         },
  //         {
  //             label: '123------------8334',
  //             id: 'phone6',
  //         },
  //     ],
  // };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      profile_uuid: '',
    };
  }

  componentDidMount() {
    const {route} = this.props;
    console.log(route.params);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({data: route.params.responseJson.billDate});
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({profile_uuid: route.params.responseJson.amount});
  }

  // update state
  onPress = whichnum => {
    console.log('selected data', whichnum);
    this.state.b_disable = true;
    const data = new FormData();
    data.append('phoneNumber', whichnum);
    data.append('uuid', this.state.profile_uuid);
    fetch('http://13.92.168.44:8000/api/phoneNumber/', {
      method: 'POST',
      body: data,
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        // responseJson.res == ERR_KEYWORDS.OTP_CODE
        //   ? this.props.navigation.navigate('OTP', {responseJson})
        //   : console.log(responseJson.res);
        if (responseJson.res == ERR_KEYWORDS.OTP_CODE) {
          this.props.navigation.navigate('OTP', {responseJson});
        } else if (
          responseJson.res == ERR_KEYWORDS.PHONE_NUMBER_LOADING_ERROR
        ) {
          this.handleAlert(ERR_KEYWORDS.PHONE_NUMBER_LOADING_ERROR);
          this.props.navigation.navigate('Connect', {responseJson});
        } else {
          this.handleAlert();
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          //title
          'Alert',
          //body
          'Please Try Again.',
          [
            {text: 'Yes', onPress: () => console.log('Yes Pressed')},
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        );
      });
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
            this.props.navigation.navigate('Connect');
          },
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  render() {
    const {navigation, route} = this.props;
    const {data} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textContainer}>Select the phone number</Text>
        <FlatList
          // ItemSeparatorComponent={Platform.OS !== 'android' && (({ highlighted }) => (
          //     <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
          // ))}
          data={data}
          renderItem={({item, index, separators}) => (
            <View style={styles.itemContainer}>
              <TouchableHighlight
                onPress={() => this.onPress(index + 1)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },
  valueText: {
    fontSize: 18,
    marginBottom: 50,
    color: 'white',
  },
  itemContainer: {
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 14,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 13,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  textContainer: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    marginTop: 15,
  },
});
