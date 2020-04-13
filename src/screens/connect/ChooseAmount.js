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

export default class BillAccountType extends React.Component {
  constructor(props) {
    super(props);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.state = {
      data: [
        {
          label: 'Amount Due',
          description: date + '-' + month + '-' + year,
          id: '1',
        },
        {
          label: 'Other',
          description: date + '-' + month + '-' + year,
          id: '2',
        },
      ],
    };
  }

  handleClick(label) {
    console.log('payment', label);
    if (label === 'Amount Due') {
      console.log("should add link here");
    } else if (label === 'Other') {
      this.props.navigation.navigate('InputAmount', {updateAmount: this.props.route.params.updateAmount});
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
