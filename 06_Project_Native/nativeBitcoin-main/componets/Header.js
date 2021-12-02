import React from 'react'; 
import {Text, StyleSheet, Platform} from 'react-native';


const Header = () => (

    <Text style={styles.encabezado}>CriptApp APP</Text>

);


//Aqui los estilos que vamos a usar 
//Aqui Aprederemosaincorporar  fuentes 
const styles = StyleSheet.create({
 encabezado:{
     paddingTop:Platform.OS === 'ios' ? 70 : 60,
   //  fontFamily:'Arial', 
     backgroundColor:'#5E49E2',
     paddingBottom:10,
     textAlign:'center',
     textTransform: 'uppercase',
     fontSize:20,
     color:'#FFF',
     marginBottom:30
 }


})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

export default Header; 