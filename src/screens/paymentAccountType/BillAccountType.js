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
import {connect} from 'react-redux';
import { billAccountType } from '../../redux/actions/payment.actions';

class BillAccountType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: 'Credit One Visa',
          icon: 'cc-visa',
          id: '1',
        },
        {
          label: 'Checking',
          icon: 'credit-card',
          id: '2',
        },
        {
          label: 'Discover',
          icon: 'cc-discover',
          id: '3',
        },
        {
          label: 'MasterCard',
          icon: 'cc-mastercard',
          id: '4',
        },
        {
          label: 'Savings',
          icon: 'credit-card',
          id: '5',
        },
        {
          label: 'Visa',
          icon: 'cc-visa',
          id: '6',
        },
        {
          label: 'American Express',
          icon: 'cc-amex',
          id: '7',
        },
      ],
    };
  }
  componentDidMount() {

  }

  handleClick= async (index)=> {
    console.log('payment', index);
    const {dispatch} = this.props;
    try {
      console.log('ddddddddddddddddddddd');
      await dispatch(billAccountType(index));
      // navigate("Home");
    } catch (error) {
      console.log('dddddddddddddddds', error);
    }
    const listData = [...this.state.data];
    if (index == listData[0].label){
      this.props.route.params.updateAccountType;
      this.props.navigation.navigate('CreditVisa');
    }
  }
  render() {
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
                    style={{position: 'absolute', top: 10, left: 20}}
                  />
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </SafeAreaView>
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
});

const mapStateToProps = ({payment}) => ({payment});

export default connect(mapStateToProps)(BillAccountType);
