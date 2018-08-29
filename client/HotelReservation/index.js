/** @format */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Apollo Client Setup
const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql'
})

const AppContainer = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

AppRegistry.registerComponent(appName, () => AppContainer);
