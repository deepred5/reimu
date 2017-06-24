import React, {Component} from 'react';
import Articles from './Articles';

export default class ThreeD extends Component {

    static navigationOptions = {
        tabBarLabel: '3D'
    };

    componentDidMount() {
        console.log('3d');
    }

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/3d/page/" />
    }
}

