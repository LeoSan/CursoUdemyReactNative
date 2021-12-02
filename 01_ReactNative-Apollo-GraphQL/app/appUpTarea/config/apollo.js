import { ApolloClient } from '@apollo/client';

import { InMemoryCache } from 'apollo-cache-inmemory';

import { createHttpLink } from 'apollo-link-http';

import { setContext } from 'apollo-link-context';

//Importo -> Esto me permite manipular variables en local Storage 
import AsyncStorage from '@react-native-community/async-storage';

const httpLink = createHttpLink({
    //uri: 'http://10.0.2.2:4000/'
    uri: 'https://apptarealeo.herokuapp.com/' //Aqui va la ruta de herou 
})

const authLink = setContext( async (_, { headers }) => {
    // Leer el token
    const token = await AsyncStorage.getItem('token'); // Asi se obtiene un token en react - native usando localStorage
    console.log("Entro aqui al apollo.js ",token);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
} );


const client = new  ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;