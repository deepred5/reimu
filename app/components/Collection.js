import React, {Component} from 'react';
import Articles from './Articles';

export default class Collection extends Component {

    static navigationOptions = {
        tabBarLabel: '合集'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/collection/page/" />
    }
}

