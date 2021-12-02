/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

  //Importamos vistas 
import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';


  

  //Inicio de React _Nacitacion 
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  const Stack = createStackNavigator();

 const App = () => {
   return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTittleAling:'center',
            headerStyle:{
              backgroundColor:'#F45EEE'
            },
            headerTintColor:'#FFF',
            headerTittleStyle:{
              fontWeight:'bold'
            } 

          }}
        >
            <Stack.Screen 
                name="Inicio" 
                component={Inicio}  
                options={{
                  title:"Componente Inicio",
                  headerTittleAling:'center',
                  headerStyle:{
                    backgroundColor:'#F4511E'
                  },
                  headerTintColor:'#FFF',
                  headerTittleStyle:{
                    fontWeight:'bold'
                  } 

                }}  
              />
            
              <Stack.Screen 
                name="Nosotros" 
                component={Nosotros}  
                options={ ( {route} )=>({
                  title: route.params.clienteId
                })  } 
              />

        </Stack.Navigator>
    </NavigationContainer>
   );
 };
 
 export default App;
 