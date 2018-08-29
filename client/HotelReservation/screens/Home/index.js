import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Home, Reservations } from './Views';

const Home = createBottomTabNavigator({
    Feed: {screen: Feed,
    navigationOptions: {
        tabBarLabel: 'Hotel List',
        tabBarIcon: <Icon name ="map" size={35} color='lightskyblue'  /> }
    },
    Reservations: {screen: Reservations,
    navigationOptions: {
        tabBarLabel: 'My Reservations',
        tabBarIcon: <Icon name ="list" size={35} color='lightskyblue'   /> }
    },   
})

export default Home;