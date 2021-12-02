import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cotizacion =( { resultado } ) =>{

    if(Object.keys(resultado).length === 0 )return null; 

    return(
        <>
        <View style={styles.resultado}>
            <Text style={styles.precio}>
                <Text style={styles.span}>  {resultado.PRICE} </Text>
            </Text>
            <Text style={styles.texto}>Precio mas alto del día: 
                <Text style={styles.span}>   {resultado.HIGHDAY} </Text>
            </Text>
            <Text style={styles.texto}>Precio mas bajo del día: 
                <Text style={styles.span}>   {resultado.LOWDAY} </Text>
            </Text>
            <Text style={styles.texto}>Ultima 24 Horas
                <Text style={styles.span}>   {resultado.CHANGEPCT24HOUR} %</Text>
            </Text>
            <Text style={styles.texto}>Ultima Actualizción
                <Text style={styles.span}>   {resultado.LASTUPDATE} </Text>
            </Text>
        </View>
        </>

    );


}

const styles = StyleSheet.create({
resultado:{
    backgroundColor:'#5E49E2',
    padding:20,
    marginTop:20,

},
texto:{
    color:'#FFF',
    fontSize:18,
    marginBottom:10


}, 
precio:{
    fontSize:38,
    color:'#FFF',
    textAlign:'center',


}, 
span:{


} 


});

export default Cotizacion; 


