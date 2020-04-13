import React, {Component, Fragment} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {apiService} from '../../services';
import {Left} from 'native-base';

export default class Bill extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    this.state = {
      listData: [
        {text: 'att.com', balance_amount: '', balance_date: '', key: '1'},
        {text: 'spectrum.net', balance_amount: '', balance_date: '', key: '2'},
        {
          text: 'consumersenergy',
          balance_amount: '',
          balance_date: '',
          key: '3',
        },
      ],
      b_progress_circle: false,
    };
  }

  componentDidMount() {
    const {navigation, route, auth} = this.props;
    const listData = [...this.state.listData];
    const index = this.state.listData.length;
    // listData.push({text: route.params.site, key: index + 1});
    console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
    this.setState({listData});

    // connect to backend
    this.getBillInfo();
  }

  getBillInfo = async () => {
    console.log('39393933939399339');
    const response = await apiService.getBill();
    console.log('responsesesesese', response.data);
    const data = response.data;
    const listData = [...this.state.listData];
    const index = this.state.listData.length;
    for (let i = 0; i < response.data.length; i++) {
      listData.push({
        text: data[i].site,
        balance_amount: data[i].balance_amount,
        balance_date: data[i].balance_date,
        key: index + 1 + i,
      });
    }
    this.setState({listData});
  };

  closeRow = async (rowMap, rowKey) => {
    // if (rowMap[rowKey]) {
    //   rowMap[rowKey].closeRow();
    // }
    console.log('refreshed');
    this.setState({b_progress_circle: true});
    try {
      const response = await apiService.refreshLogin('att.com');
      console.log('this is response data', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteRow = async (rowMap, rowKey) => {
    this.closeRow(rowMap, rowKey);
    const {listData} = this.state;
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({listData: newData});
    console.log('deleted');
    this.setState({b_progress_circle: true});
    try {
      const response = await apiService.deleteBill('att.com');
      console.log('this is response data', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  renderItem = data => (
    <TouchableHighlight
      onPress={() => {
        this.props.navigation.navigate('BillPayment');
      }}
      style={styles.rowFront}
      underlayColor={'#AAA'}>
      <View>
        <Text style={styles.billText}>{data.item.text}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 3,
          }}>
          <Text style={styles.billAmount}>{data.item.balance_amount}</Text>
          <Text style={styles.billDate}> {data.item.balance_date}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => this.closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => this.deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    const {navigation, route, auth} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Added Bills</Text>
        <SwipeListView
          data={this.state.listData}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          keyExtractor={item => item.key}
          rightOpenValue={-150}
          previewOpenDelay={3000}
          onRowDidOpen={this.onRowDidOpen}
          style={styles.swipeListView}
        />
        {this.state.b_progress_circle ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Fragment />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  backTextWhite: {
    color: '#FFF',
  },
  listView: {
    backgroundColor: '#1c313a',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    color: 'white',
  },
  billText: {
    fontSize: 18,
    color: 'white',
  },
  billAmount: {
    fontSize: 10,
    color: 'white',
  },
  billDate: {
    fontSize: 10,
    color: 'white',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#1c313a',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#33B5FF',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#FF5733',
    right: 0,
  },
  swipeListView: {},
});
