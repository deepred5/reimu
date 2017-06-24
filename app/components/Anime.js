import React, {Component} from 'react';
import Articles from './Articles';

export default class Anime extends Component {

    static navigationOptions = {
        tabBarLabel: '动画'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/anime/page/" />
    }
}

