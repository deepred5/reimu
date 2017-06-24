import React, {Component} from 'react';
import Articles from './Articles';

export default class Comic extends Component {

    static navigationOptions = {
        tabBarLabel: '漫画'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/comic/page/" />
    }
}

