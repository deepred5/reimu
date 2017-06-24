import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Linking,
    Modal,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    ToastAndroid,
    Alert
} from 'react-native';

import FitImage from 'react-native-fit-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingIndicator from './LoadingIndicator';

import detailParser from '../parser/detailParser';

export default class ThreeD extends Component {
    static navigationOptions = {
        tabBarLabel: '3D'
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            images: [],
            index: 0,
            modalVisible: false
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    showModalImg(index) {
        console.log(index);
        if (index > -1) {
            this.setState({
                index: index,
                modalVisible: true
            })
        }
    }

    closeModalImg() {
        this.setState({
            modalVisible: false,
            index: 0
        });
    }

    fetchData() {
        const url = 'https://blog.reimu.net/archives/17202';
        fetch(url)
            .then((res) => res.text())
            .then((html) => {
                let {data, imagesArr} = detailParser(html);
                console.log(data);
                this.setState({
                    data: data,
                    isLoading: false,
                    images: imagesArr,
                });
            })
            .catch((e) => {
                console.log(e);
                ToastAndroid.show('加载失败', ToastAndroid.SHORT);
                this.setState({
                    isLoading: false
                });
            })
    }

    findImgIndex(url) {
        let imgIndex = -1;

        for (let i = 0; i < this.state.images.length; i++) {
            if (this.state.images[i].url === url) {
                imgIndex = i;
                break;
            }
        }

        return imgIndex;

    }

    goOriginal(item) {

        Alert.alert(
            item.content,
            '打开外部链接?',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed')},
                {text: '确定', onPress: () => open(item.originalUrl)},
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

    renderDetail = (item) => {

        let resultView = null;

        if (item.type === 0) {
            resultView = (
                <View style={styles.line}></View>
            )
        } else if (item.type === 4) {
            resultView = (
                <TouchableNativeFeedback onPress={() => this.goOriginal(item)}>
                    <View style={styles.originalUrlContainer}>
                        <Icon name="link" size={15} style={styles.icon}/>
                        <Text style={[styles.originalUrl]}>{item.content}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        else {

            if (item.imageUrl) {
                let imgIndex = this.findImgIndex(item.imageUrl);
                resultView = (
                    <View style={styles.content}>
                        <TouchableNativeFeedback onPress={() => this.showModalImg(imgIndex)}>
                            <FitImage source={{uri: item.imageUrl}}/>
                        </TouchableNativeFeedback>
                        <Text selectable={true} style={styles.contentWord}>{item.content}</Text>
                    </View>
                );
            } else {
                resultView = (
                    <View style={[styles.content, item.type === 3 ? styles.download : {}]}>
                        <Text selectable={true} style={styles.contentWord}>{item.content}</Text>
                    </View>
                );
            }
        }

        return resultView;
    };

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator />
        }
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <FlatList data={this.state.data}
                          renderItem={({item}) => this.renderDetail(item)}
                          style={styles.container}
                />
                <Modal visible={this.state.modalVisible} transparent={true}
                       onRequestClose={() => this.closeModalImg() } animationType="fade">
                    <ImageViewer index={this.state.index} imageUrls={this.state.images} saveToLocalByLongPress={false}/>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    line: {
        backgroundColor: 'rgba(34,49,63,0.3)',
        height: 1,
        marginBottom: 15
    },
    content: {
        marginBottom: 15
    },
    download: {
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(34, 49, 63, 0.1)'
    },
    contentWord: {
        color: '#22313f',
        fontSize: 16,
        lineHeight: 25
    },
    originalUrlContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center'
    },
    originalUrl: {
        color: '#55c3dc',
        fontSize: 16,
    },
    icon: {
        marginRight: 15
    }
});
