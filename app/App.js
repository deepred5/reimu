import React, {Component} from 'react';

import {
    BackHandler,
    ToastAndroid,
    DrawerLayoutAndroid,
    View,
    Text
} from 'react-native';

import {
    StackNavigator
} from "react-navigation";

import AllTab from './Tab';
import Detail from './components/Detail';

AllTab.navigationOptions = {
    header() {
        return (
            <Text>灵梦御所</Text>
        )
    }
};
const Navigator = StackNavigator({
    Home: {screen: AllTab},
    Detail: {screen: Detail}
});

const LOGOUT_TIME = 2000;

class App extends Component {

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
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>深红</Text>
            </View>
        );


        return (
            <DrawerLayoutAndroid
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <Navigator/>
            </DrawerLayoutAndroid>
        );
    }
}


export default App;

