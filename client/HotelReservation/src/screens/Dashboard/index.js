import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';

import { Feed, Reservations } from './Views';

import Icon from 'react-native-vector-icons/Feather'


const Dashboard = createBottomTabNavigator({
    Feed: {screen: Feed,
    navigationOptions: {
        tabBarLabel: 'Hotel List',
        tabBarIcon: <Icon name ="map" size={35} color='rgba(0, 0, 0, 0.8)' /> }
    },
    Reservations: {screen: Reservations,
    navigationOptions: {
        tabBarLabel: 'My Reservations',
        tabBarIcon: <Icon name ="list" size={35} color='rgba(0, 0, 0, 0.8)'  /> }
    },   
})

export default Dashboard;