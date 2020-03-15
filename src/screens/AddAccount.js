import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import SITE_LINKS from '../constants';

const width = '80%';

class AddAccount extends React.Component {
  state = {
    url: 'att.com',
    query: '',
    data: [
      'att.com',
      'spectrum.net',
      'consumersenergy.com/',
      'facebook.com',
      'youtube.com',
      'yahoo.com',
      'twitter.com',
      'ebay.com',
      'cnn.com',
      'amazon.com',
      'pinterest.com',
      'linkedin.com',
    ],
  };

  handleConnect = url => {
    if (!url.trim()) {
      return;
    }
    this.setState({query: url});
    console.log('next', url);
    this.props.navigation.navigate('Connect', {url});
  };

  findData(query) {
    const {data} = this.state;
    if (!query || !data) {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(d => d.search(regex) >= 0);
  }

  render() {
    const {query} = this.state;
    const data = this.findData(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={data.length === 1 && comp(query, data[0]) ? [] : data}
            defaultValue={query}
            onChangeText={text => this.setState({query: text})}
            placeholder="Enter the site link"
            inputContainerStyle={styles.inputContainer}
            listStyle={styles.listContainer}
            renderTextInput={({style, ...rest}) => (
              <TextInput style={[style, styles.inputBox]} {...rest} />
            )}
            keyExtractor={({item, i}) => i}
            renderItem={({item, i}) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.handleConnect(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    padding: 16,
    // marginTop: 40,
  },
  searchBoxContainer: {
    position: 'relative',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 45,
  },
  listContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: -15,
    paddingTop: 15,
    paddingBottom: 10,
    marginHorizontal: 2,
    paddingHorizontal: 0,
    zIndex: 1,
  },
  autocompleteContainer: {
    borderRadius: 25,
    borderWidth: 0,
    width: '100%',
    height: 150,
    position: 'absolute',
  },
  inputContainer: {
    backgroundColor: '#859aa4',
    borderColor: 'gray',
    borderRadius: 25,
    // fontSize: 14,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  inputBox: {
    backgroundColor: 'transparent',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
});

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(AddAccount);
