import React, {Component} from 'react';
import Articles from './Articles';

export default class AllArticles extends Component {

    static navigationOptions = {
        tabBarLabel: '所有'
    };

    render() {
        return <Articles navigation={this.props.navigation} />
    }
}

