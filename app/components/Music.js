import React, {Component} from 'react';
import Articles from './Articles';

export default class Music extends Component {

    static navigationOptions = {
        tabBarLabel: '音乐'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/music/page/" />
    }
}

