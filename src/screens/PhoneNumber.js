import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableHighlight
} from 'react-native';

export default class PhoneNumber extends React.Component {

    state = {
        data: [
            {
                label: '123------------3123',
                id: 'phone1'
            },
            {
                label: '123------------6834',
                id: 'phone2',
            },
            {
                label: '123------------9365',
                id: 'phone3',
            },
            {
                label: '123------------5263',
                id: 'phone8',
            },
            {
                label: '123------------9934',
                id: 'phone4',
            },
            {
                label: '123------------1723',
                id: 'phone5',
            },
            {
                label: '123------------8334',
                id: 'phone6',
            },
            {
                label: '123------------0234',
                id: 'phone7',
            },
            {
                label: '123------------8244',
                id: 'phone10',
            },
            {
                label: '123------------9354',
                id: 'phone9',
            },
            {
                label: '123------------1132',
                id: 'phone11',
            },
        ],
    };

    // update state
    onPress = data => {
        console.log("selected data", data);
        // const { navigation: { navigate } } = this.props;
        // navigate('Result', { data: data });
    }

    render() {
        const { data } = this.state;
        return (
            
            <SafeAreaView style={styles.container}>
                <Text style={styles.textContainer}>Select the phone number</Text>
                <FlatList
                    // ItemSeparatorComponent={Platform.OS !== 'android' && (({ highlighted }) => (
                    //     <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
                    // ))}
                    data={data}
                    renderItem={({ item, index, separators }) => (
                        <View style={styles.itemContainer}>
                            <TouchableHighlight
                                onPress={() => this.onPress(item)}
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

};

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
        overflow: "hidden",
    },
    itemText: {
        fontSize: 16,
        flex: 1,
        paddingVertical: 13,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: "center",
    },
    textContainer: {
        textAlign: "center",
        color: "white",
        fontSize: 22,
        marginTop: 15,
    }
});

