import React, {Component} from 'react';

import {
    BackHandler,
    ToastAndroid,
    View,
    StatusBar,
} from 'react-native';

import Navigator from  './Navigator';

import SplashScreen from 'react-native-splash-screen';

const LOGOUT_TIME = 2000;

class App extends Component {

    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + LOGOUT_TIME >= Date.now()) {
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出御所', ToastAndroid.SHORT);
        return true;
    };

    render() {

        return (
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor="rgba(85,195,220,0.8)"
                        barStyle="light-content"
                    />
                    <Navigator/>
                </View>


        );

    }
}


export default App;

