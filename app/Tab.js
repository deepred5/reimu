import React from 'react';
import {
    Dimensions,
} from 'react-native';

import {TabNavigator} from "react-navigation";

import Status from './components/Status';
import AllArticles from './components/AllArticles';
import ThreeD from './components/ThreeD';
import AV from './components/AV';
import Anime from './components/Anime';
import Cosplay from './components/Cosplay';
import Collection from './components/Collection';
import Picture from './components/Picture';
import Wallpaper from './components/Wallpaper';
import Chinese from './components/Chinese';
import Game from './components/Game';
import Comic from './components/Comic';
import Indie from './components/Indie';
import Music from './components/Music';

const {width: SCREEN_WIDTH} = Dimensions.get('window');


const Tab = TabNavigator({
    Status: {screen: Status},
    AllArticles: {screen: AllArticles},
    Anime: {screen: Anime},
    Collection: {screen: Collection},
    Game: {screen: Game},
    Comic: {screen: Comic},
    Indie: {screen: Indie},
    ThreeD: {screen: ThreeD},
    Picture: {screen: Picture},
    Wallpaper: {screen: Wallpaper},
    Music: {screen: Music},
    AV: {screen: AV},
    Chinese: {screen: Chinese},
    Cosplay: {screen: Cosplay},
}, {
    lazy: true,
    backBehavior: 'none',
    initialRouteName: 'AllArticles',
    tabBarOptions: {
        style: {
            backgroundColor: '#55c3dc',
        },
        tabStyle: {
            width: SCREEN_WIDTH / 6,
            height: 50
        },
        indicatorStyle: {
            backgroundColor: '#fff'
        },
        scrollEnabled: true,
    },
});

export default Tab;

