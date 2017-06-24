import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';


export default class Status extends Component {
    static navigationOptions = {
        tabBarLabel: '动态'
    };

    render() {
        return (
            <View>
                <Text>御所动态</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Detail')}
                    title="go to Detail"
                />
            </View>
        );
    }
}


