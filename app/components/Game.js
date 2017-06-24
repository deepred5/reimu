import React, {Component} from 'react';
import Articles from './Articles';

export default class Game extends Component {

    static navigationOptions = {
        tabBarLabel: '游戏'
    };

    render() {
        return <Articles navigation={this.props.navigation} api="https://blog.reimu.net/archives/category/game/page/" />
    }
}

