import React, {Component} from 'react';
import Articles from './Articles';

export default class Chinese extends Component {

    static navigationOptions = {
        tabBarLabel: '汉化'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/chinese/page/" />
    }
}

