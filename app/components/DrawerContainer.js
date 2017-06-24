import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export default class DrawerContainer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Image source={require('../../img/user.jpeg')}
                           style={styles.avatar}/>
                </View>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('About')}>
                    <View style={styles.infoContainer}>
                        <Icon name="md-construct" size={18}/><Text style={styles.about}>关于</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userContainer: {
        height: 150,
        backgroundColor: '#55c3dc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40
    },

    about: {
        fontSize: 16,
        marginLeft: 5
    },
    infoContainer: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
});



