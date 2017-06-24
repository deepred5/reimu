import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    DrawerLayoutAndroid,
    Text,
} from 'react-native';

import {StackNavigator} from "react-navigation";

import AllTab from './Tab';
import Detail from './components/Detail';
import About from './components/About';
import DrawerContainer from './components/DrawerContainer';

import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {

    onActionSelected = (index) => {
        console.log(index);
    };

    openDrawer = () => {
        this.drawer.openDrawer();
    };

    render() {

        return (
            <DrawerLayoutAndroid
                ref={(drawer) => {
                    this.drawer = drawer;
                }}
                drawerWidth={280}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <DrawerContainer navigation={this.props.navigation}/>}>
                <View style={styles.container}>
                    <Icon.ToolbarAndroid
                        navIconName="md-menu"
                        actions={[]}
                        title="灵梦御所"
                        style={styles.toolbar}
                        titleColor="#fff"
                        onActionSelected={this.onActionSelected}
                        iconColor="#fff"
                        onIconClicked={this.openDrawer}
                    />
                    <AllTab navigation={this.props.navigation}/>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

// 解决无法跳转的bug
// https://github.com/react-community/react-navigation/blob/master/docs/guides/Guide-Nested.md
Home.router = AllTab.router;

Home.navigationOptions = {
    header: null
};


const Navigator = StackNavigator({
    Home: {screen: Home},
    Detail: {screen: Detail},
    About: {screen: About},
});


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: 50,
        backgroundColor: '#55c3dc'
    }
});

export default Navigator;