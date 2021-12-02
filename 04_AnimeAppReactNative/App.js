/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Anmacion01  from './components/Animacion1';
import Anmacion02  from './components/Animacion2';
import Anmacion03  from './components/Animacion3';
import Anmacion04  from './components/Animacion4';
import Anmacion05  from './components/Animacion5';
import Anmacion06  from './components/Animacion6';
import Anmacion07  from './components/Animacion7';

const App = () => {
  return (
    <>
      <View style={StyleSheet.contenido}>
        <Text> Pruebas de Animaciones  </Text>
        <Anmacion01/>

      </View>
      <View >
         <Anmacion02 style={StyleSheet.contAnime02} />
    </View>

    <View >
         <Anmacion03 style={StyleSheet.contAnime02} />
    </View>
    <View >
         <Anmacion04 style={StyleSheet.contAnime04} />
    </View>
    <View >
         <Anmacion05 style={StyleSheet.contenido}/>
    </View>  
    <View >
         <Anmacion06 style={StyleSheet.contenido}/>
    </View>  
    <View >
         <Anmacion07 style={StyleSheet.contenido}/>
    </View>              
    </>
  );
};

const styles = StyleSheet.create({
  contenido:{
    marginTop:100,
  },
  contAnime02:{
    height:200,
  }

});

export default App;
