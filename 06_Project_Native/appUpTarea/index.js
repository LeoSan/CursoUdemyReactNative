/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Apllo 
import client from './config/apollo'; 
import { ApolloProvider } from '@apollo/client'; // Todos los diferentes metodos que hay en apollo estara disponibles en los otros componentes 

const upTaskApp = ()=>(
    <ApolloProvider client = {client} >
        <App/>
    </ApolloProvider>

)

AppRegistry.registerComponent(appName, () => upTaskApp);
