import React, {Component} from 'react';
import Articles from './Articles';

export default class AV extends Component {

    static navigationOptions = {
        tabBarLabel: '三次'
    };

    componentDidMount() {
        console.log('三次');
    }

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/third/page/" />
    }
}

