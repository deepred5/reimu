import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    Linking
} from 'react-native';


export default class About extends Component {
    static navigationOptions = {
        title: '关于',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#55c3dc'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: '作者',
                    content: '深红',
                    url: 'https://github.com/deepred5'
                },
                {
                    title: '源码',
                    content: 'https://github.com/deepred5/reimu',
                    url: 'https://github.com/deepred5/reimu'
                }
            ]
        };
    }

    render() {

        const list = this.state.data.map((item, index) => {
            return (
                <View style={styles.cell} key={index}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableNativeFeedback onPress={() => Linking.openURL(item.url)}>
                        <Text>{item.content}</Text>
                    </TouchableNativeFeedback>
                </View>
            )
        });

        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => Linking.openURL('http://space.bilibili.com/3128362')}>
                    <Image source={require('../../img/avatar.jpg')} style={styles.avatar}/>
                </TouchableNativeFeedback>
                {list}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    cell: {
        marginBottom: 30
    },
    title: {
        color: '#000',
        fontSize: 16
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 15
    },
});


