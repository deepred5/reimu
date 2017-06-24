import React, {Component} from 'react';
import Articles from './Articles';

export default class Cosplay extends Component {

    static navigationOptions = {
        tabBarLabel: '半次'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/dotthree/page/" />
    }
}

