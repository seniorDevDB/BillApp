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
import {apiService} from '../../services';
import {connect} from 'react-redux';

class BillPayment extends React.Component {
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
          amount: '',
          id: 'phone1',
        },
        {
          label: 'Now',
          description: date + '-' + month + '-' + year,
          payDate: '',
          icon: 'calendar',
          id: 'phone2',
        },
        {
          label: 'Choose Account',
          description: "Select the account you'd like to pay from",
          icon: 'credit-card',
          routing_number: '',
          account_number: '',
          id: 'phone3',
        },
      ],
    };
  }

  componentDidMount() {
    console.log("commpone IDD mount called");
    // const {navigation, route, payment} = this.props;
    // console.log(payment);
    // let data = [...this.state.data];
    // data[0].label= payment.amount;
    // data[2].label= payment.bill_account_type;
  }

  updateAccountTypeInfo=(routing_number, account_number)=> {
    // const {route} = this.props;
    console.log("848484848484484848")
    console.log(this.state);
    let data = [...this.state.data];
    console.log(data);
    // if(route && route.params && route.params.amount){
    //   data[0].label = route.params.amount;
    //   this.setState(data);
    // }
    // else if(route && route.params && route.params.account_number && route.params.routing_number){
    //   console.log("called accounting number");
    //   data[2].routing_number = routing_number;
    //   data[2].account_number = account_number;
    //   this.setState(data);
    // }
    console.log(routing_number, account_number);
    data[2].routing_number = routing_number;
    data[2].account_number = account_number;
    this.setState(data);
  }

  updateAccountType=()=> {
    console.log("account type clicked");
    let data = [...this.state.data];
    data[3].label = payment.bill_account_type;
    this.setState(data);
  }

  updateAmount=(amount)=> {
    console.log("amount", amount);
    let data = [...this.state.data];
    data[0].label = amount;
    this.setState(data);
  }

  handleClick=(index)=> {
    console.log('4242424242', index);
    let state_data = [...this.state.data];
    if (index === state_data[0].label) {
      console.log("6161616");
      this.props.navigation.navigate('ChooseAmount', {updateAmount: this.updateAmount});
    } else if (index === state_data[1].label) {
      this.props.navigation.navigate('ChooseDate');
    } else if (index === state_data[2].label) {
      console.log("4242424242")
      this.props.navigation.navigate('BillAccountType', {updateAccountType: this.updateAccountType});
    }
  }

  handleMakePayment = async () => {
    console.log("clcicked");
    const {navigation, route, payment} = this.props;
    console.log("115115115115", payment.amount);
    console.log(payment.bill_account_info);
    let data = [...this.state.data];
    try {
      const response = await apiService.makePayment(
        "att.com",
        payment.amount,
        "payDate",
        payment.bill_account_info.card_number,
        payment.bill_account_info.expiration_date,
        payment.bill_account_info.security_code,
        payment.bill_account_info.zip_code,
      );
      console.log('this is response data', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {navigation, route, payment} = this.props;
    // console.log("fdsafdsafdsfdsa", payment.bill_account_info);
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

const mapStateToProps = ({payment}) => ({payment});

export default connect(mapStateToProps)(BillPayment);
