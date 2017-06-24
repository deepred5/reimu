import React, {Component} from 'react';
import Articles from './Articles';

export default class Indie extends Component {

    static navigationOptions = {
        tabBarLabel: '独立'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/indie/page/" />
    }
}

