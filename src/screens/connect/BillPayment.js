import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {ERR_KEYWORDS} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BillPayment extends React.Component {
  constructor(props) {
    super(props);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.state = {
      data: [
        {
          label: 'Choose Amount',
          description: "Select the amount you'd like to pay",
          icon: 'dollar',
          id: 'phone1',
        },
        {
          label: 'Now',
          description: date + '-' + month + '-' + year,
          icon: 'calendar',
          id: 'phone2',
        },
        {
          label: 'Choose Account',
          description: "Select the account you'd like to pay from",
          icon: 'credit-card',
          id: 'phone3',
        },
      ],
    };
  }

  handleClick(index) {
    console.log('4242424242', index);
    if (index === 'Choose Account') {
      this.props.navigation.navigate('BillAccountType');
    } else if (index === 'Now') {
      this.props.navigation.navigate('ChooseDate');
    } else if (index === 'Choose Amount') {
      this.props.navigation.navigate('ChooseAmount');
    }
  }
  render() {
    const {navigation, route} = this.props;
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeareacontainer}>
          <FlatList
            data={data}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => this.handleClick(item.label)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={styles.itemContainer}>
                  <Icon
                    name={item.icon}
                    size={30}
                    color="#fff"
                    style={{position: 'absolute', top: 30, left: 20}}
                  />
                  <Text style={styles.itemText}>{item.label}</Text>
                  <Text style={styles.itemDescriptionText}>{item.description}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </SafeAreaView>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleMakePayment}>
            Review & Pay
          </Text>
        </TouchableOpacity>
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
  safeareacontainer: {
    // flex: 1,
    backgroundColor: '#455a64',
    width: '80%',
    height: '60%',
  },
  buttonContainer: {
    backgroundColor: '#1c313a',
    borderRadius: 25,
    width: '80%',
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 14,
    marginHorizontal: 16,
    // display: 'flex',
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 16,
    // flex: 1,
    paddingVertical: 13,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  itemDescriptionText: {
    fontSize: 10,
    // flex: 1,
    paddingVertical: 13,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  }
});
