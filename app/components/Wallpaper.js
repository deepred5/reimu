import React, {Component} from 'react';
import Articles from './Articles';

export default class Wallpaper extends Component {

    static navigationOptions = {
        tabBarLabel: '壁纸'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/wallpaper/page/" />
    }
}

