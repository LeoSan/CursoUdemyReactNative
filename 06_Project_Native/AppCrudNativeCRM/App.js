/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';

 import React from 'react';
 
 import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

 
  //Inicio de React _Nacitacion 
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  //Importamos vistas 
  import Inicio         from './views/Inicio';
  import DetalleCliente from './views/DetalleCliente';
  import NuevoCliente   from './views/NuevoCliente';


  //Importamos Componentes 
  import BarraSuperior from './components/ui/Barra';

  //Declaramos nuestro navegador Tipo stack, recuerda que hay otros mas TAP, DRAGER 
  const Stack = createStackNavigator();


  //Declaramos nuestro tema por defecto de paper 
  const theme = {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      primary:'#1774F2',
      surface:'#61BAFF',
    }
  }

//console.log(theme.colors);


 import {
   StyleSheet,
   Text,
   View,
 } from 'react-native';
 


const  App = () => {

  return (
    <PaperProvider>
    <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Inicio"
              screenOptions={{
                headerStyle:{
                  backgroundColor:theme.colors.primary,
                },
                headerTintColor:theme.colors.surface,
                headerTitleStyle:{
                    fontWeight:'bold',
                    
                }
              }}
          >
              <Stack.Screen
                name='Inicio'
                component={Inicio}                     //Es un Callback esto nos permite pasar parametros 
                options={ ({ navigation, route}) =>({ // Paso 1: aqui podremos pasar valores al boton 
                //  headerRight: (props) => <BarraSuperior {...props}  //  Paso 2: sin esto no pasamos valores al navegador
                //                          navigation={navigation}
                //                          route={route}
                //    
                //                        /> 
                })}
    
              ></Stack.Screen>              
              
              <Stack.Screen
                name='NuevoCliente'
                component={NuevoCliente}
                options={{
                  title:"Nuevo Cliente"
                }}
              ></Stack.Screen>              
              
              <Stack.Screen
                name='DetalleCliente'
                component={DetalleCliente}
                  options={{
                    title:"Detalles Cliente"
                  }}                
              >
              </Stack.Screen>           
          
            </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
