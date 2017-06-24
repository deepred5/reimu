import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    FlatList,
    ToastAndroid
} from 'react-native';

import FitImage from 'react-native-fit-image';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingIndicator from './LoadingIndicator';

import articleParser from '../parser/articleParser';

const intersexPerson = ['小8酱', '晴舒天下', '伪装布雷舰', '深红', 'Kung', '小⑨酱', '文文'];



export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            currentPage: 1,
            totalPages: 1
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    goDetail(article) {
        const {navigate} = this.props.navigation;
        navigate('Detail', {article: article})
    }

    renderArticle = (article) => {

        return (
            <TouchableNativeFeedback onPress={() => {
                this.goDetail(article)
            }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{article.title}</Text>
                        {article.imageUrl ? (<FitImage style={styles.poster} source={{uri: article.imageUrl}}/>) :
                            (<Text></Text>)}
                        <Text style={styles.summary}>{article.summary}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Icon name="calendar" size={15}/>
                            <Text>&nbsp;&nbsp;{article.time}</Text>
                        </View>
                        <View style={styles.info}>
                            {intersexPerson.indexOf(article.author) > -1 ? (
                                <Icon name="intersex" size={15}/>) : (
                                <Icon name="mars" size={15}/>)}
                            <Text>&nbsp;&nbsp;{article.author}</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon name="folder-open" size={15}/>
                            <Text>&nbsp;&nbsp;{article.category.join(', ')}</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon name="tag" size={15}/>
                            <Text>&nbsp;&nbsp;{article.tags.join(', ')}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    };

    fetchData() {
        console.log('fetch');
        fetch(`${this.props.api}${this.state.currentPage}`)
            .then((res) => res.text())
            .then((html) => {
                let {data, totalPages} = articleParser(html);
                console.log(data);
                this.setState({
                    data: this.state.data.concat(data),
                    isLoading: false,
                    totalPages: totalPages,
                    currentPage: ++this.state.currentPage
                });
            })
            .catch((e) => {
                ToastAndroid.show('加载失败', ToastAndroid.SHORT);
                this.setState({
                    isLoading: false,
                });
                console.log(e);
            })
    }

    onEndReached = () => {
        console.log('onEndReached');

        if (this.state.currentPage > this.state.totalPages) {
            console.log('全部数据加载完了');
            ToastAndroid.show('没有新文章了', ToastAndroid.SHORT);
            return;
        }

        this.setState({
            isLoading: true
        }, this.fetchData);

    };


    render() {

        return (
            <View>
                {this.state.isLoading ? <LoadingIndicator /> : null}
                <FlatList data={this.state.data}
                          renderItem={({item}) => this.renderArticle(item)}
                          onEndReached={this.onEndReached}
                          onEndReachedThreshold={0.5}
                >
                </FlatList>
            </View>
        );
    }
};

Articles.defaultProps = {
    api: 'https://blog.reimu.net/page/'
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    content: {
        padding: 15,
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    poster: {
        marginTop: 10,
        marginBottom: 10
    },
    summary: {
        color: '#22313f',
        lineHeight: 24
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        padding: 15,
        paddingBottom: 10,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    info: {
        marginRight: 15,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

