import React, {Component} from 'react';
import Articles from './Articles';

export default class Picture extends Component {

    static navigationOptions = {
        tabBarLabel: '图包'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/picture/page/" />
    }
}

