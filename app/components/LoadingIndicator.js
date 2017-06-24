import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';

export default class LoadingIndicator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.style}>
                <ActivityIndicator color={this.props.color} size={this.props.size} animating={this.props.animating} />
            </View>
        );
    }
}

LoadingIndicator.defaultProps = {
    color: '#55c3dc',
    size: 'large',
    style: {
        position: 'absolute',
        left: (Dimensions.get('window').width - 40) / 2,
        top: 20,
        zIndex: 99999
    },
    animating: true
};
