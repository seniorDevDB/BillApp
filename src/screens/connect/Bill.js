import React, {Component} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

export default class Bill extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    this.state = {
      listData: [
        {text: 'att.com', key: '1'},
        {text: 'spectrum.net', key: '2'},
        {text: 'consumersenergy', key: '3'},
      ],
    };
  }

  componentDidMount() {
    const {navigation, route, auth} = this.props;
    const listData = [...this.state.listData];
    const index = this.state.listData.length;
    // listData.push({text: route.params.url, key: index + 1});
    this.setState({listData});
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    this.closeRow(rowMap, rowKey);
    const {listData} = this.state;
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({listData: newData});
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
});
