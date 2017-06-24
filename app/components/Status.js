import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    ToastAndroid,
    ScrollView,
    Linking,
    Alert
} from 'react-native';

import LoadingIndicator from './LoadingIndicator';
import statusParser from '../parser/statusParser';

import FitImage from 'react-native-fit-image';

const api = 'https://blog.reimu.net/';


export default class Status extends Component {
    static navigationOptions = {
        tabBarLabel: '动态'
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {

        console.log('fetch');

        fetch(api)
            .then((res) => res.text())
            .then((html) => {
                let data = statusParser(html);
                console.log(data);
                this.setState({
                    isLoading: false,
                    data: data
                });
            })
            .catch((err) => {
                console.log(err);
                ToastAndroid.show('加载失败', ToastAndroid.SHORT);
                this.setState({
                    isLoading: false
                });
            })
    }

    openUrl(item) {
        Alert.alert(
            item.content,
            '打开外部链接?',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed')},
                {text: '确定', onPress: () => open(item.url)},
            ],
            {cancelable: true}
        );

        function open(url) {
            Linking.openURL(url)
                .catch(err => {
                    console.log(err);
                    ToastAndroid.show('打开链接失败', ToastAndroid.SHORT);
                });
        }
    }

    render() {

        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }

        const _this = this;

        const links = this.state.data.links.map(function (item, index) {
            return (
                <TouchableNativeFeedback onPress={() => _this.openUrl(item)} key={index}>
                    <Text style={styles.originalUrl}>{item.content}</Text>
                </TouchableNativeFeedback>
            )
        });

        const imgs = this.state.data.imgs.map(function (item, index) {
            return (
                <FitImage style={{marginBottom: 20}} source={{uri: item}} key={index}/>
            )
        });

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.blockquote}>{this.state.data.blockquote}</Text>
                <Text style={styles.content}>{this.state.data.content}</Text>
                {imgs}
                {links}
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    blockquote: {
        fontSize: 20,
        paddingLeft: 20,
        borderLeftWidth: 4,
        borderColor: 'rgba(34, 49, 63, 0.7);',
        lineHeight: 25,
        color: 'rgba(34,49,63,0.7)',
        marginBottom: 20
    },
    content: {
        lineHeight: 25,
        color: '#000',
        fontSize: 16,
        marginBottom: 20
    },
    originalUrl: {
        color: '#fff',
        fontSize: 16,
        backgroundColor: '#55c3dc',
        padding: 10,
        marginBottom: 4,
        textAlign: 'center'
    }
});



