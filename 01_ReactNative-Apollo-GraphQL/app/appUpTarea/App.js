//Importamos Librerias React y React-Native 
import 'react-native-gesture-handler'; /// Primordial este siempre va de primero
import React, {Fragment} from 'react';
import { Root } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Genero el tipo de Vista que se usara en la versión movil 
const Stack = createStackNavigator(); //Esto permite crear ventanas 

//Importamos nuestras vistas  
import Login       from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Proyectos   from './views/Proyectos';
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto      from './views/Proyecto';



const App  = () => {
  return (
    <Fragment>
    <Root> 
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Iniciar Sesión",
            headerShown: false // Esto permite quitar el menu superior 
          }}
        />        
        
        <Stack.Screen
        name="CrearCuenta"
        component={CrearCuenta}
        options={{
          title: "Crear Cuenta", 
          headerStyle: {
            backgroundColor: '#28303B'
          }, 
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />

      <Stack.Screen
        name="Proyectos"
        component={Proyectos}
        options={{
          title: "Proyectos", 
          headerStyle: {
            backgroundColor: '#28303B'
          }, 
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />    
      
      <Stack.Screen
      name="NuevoProyecto"
      component={NuevoProyecto}
      options={{
        title: "Nuevo Proyecto", 
        headerStyle: {
          backgroundColor: '#28303B'
        }, 
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    />      
    

    <Stack.Screen
    name="Proyecto"
    component={Proyecto}
    options={ ({route}) => ({

      //Leonard: La  linea 84-> super importante manera de personalizar nuestras  pantallas option le pasamos un callBakc  
      title: route.params.nombre, 
      headerStyle: {
        backgroundColor: '#28303B'
      }, 
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    })}
  />    


       

         </Stack.Navigator>
      </NavigationContainer>


    </Root>
    </Fragment>
  );
};

export default App;
