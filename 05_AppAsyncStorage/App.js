/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  View,
} from 'react-native';

import SyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-community/async-storage';


const App = () => {

  const [inpuText, setInput] = useState('');
  const [nombreStorage, setnombreStorage] = useState('');

  //Metodos funcionales 


useEffect( ()=>{
  ontenerDatosStorage(); 


},[inpuText] )

 //Nota: si usamos Sync debemos genear async y away en el metodo 
 
  const guardarDatos = async () => {
    console.log('Guardando');
    console.log( inpuText );

    try {

      //Forma de guardar unStorage
      await SyncStorage.setItem('nombre', inpuText);
      setnombreStorage(inpuText);
      
    } catch (error) {
      console.log( error );
    }

  }; //Fin del primer metodo

  const ontenerDatosStorage = async()=>{

    try {
      const nombre = await AsyncStorage.getItem('nombre')
      console.log( ' Aqui nombre ->', nombre );
      setnombreStorage(nombre);
    } catch (error) {
      console.log( error );
    }


  };//Fin del segundo metodo

  const eliminarDatos = async()=>{
    try {
       await AsyncStorage.removeItem('nombre')
       setnombreStorage('');
    } catch (error) {
      console.log( error );
    }
  }

  return (
    <>
    <View style={styles.contenedor}>
      { nombreStorage ? <Text> Hola: {nombreStorage}</Text>  : null }
      
      <TextInput 
        placeholder="Escribe tu nombre"
        style={styles.input}
        onChangeText={ texto => setInput( texto ) }
        />
      <Button
        title="Guardar"
        color="#333"
          onPress={() => guardarDatos() }
        />

      { nombreStorage ? 
        (      
          <TouchableHighlight 
              style={styles.btnEliminar}
              onPress={ ()=>eliminarDatos() }
              >
              <Text style={styles.TextoEliminar}> Eliminar Nombre  </Text>
          </TouchableHighlight>
        )   
      : null }
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex:1,
    backgroundColor:'#FFF',
    alignItems:'center',
    justifyContent:'center'

  },
  input: {
    borderColor:'#666',
    borderBottomWidth:1,
    width:300,
    height:40,  
  },
  btnEliminar:{
    backgroundColor:'blue',
    marginTop:20,
    padding:10,

  }, 
  TextoEliminar:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    textTransform:'uppercase',
    width:300
  }
});

export default App;
