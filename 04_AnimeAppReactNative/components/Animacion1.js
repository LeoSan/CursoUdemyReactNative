import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

const Animacion1 = () => {

    //Paso 1: Importo Animated, useState, useEffect  

    //Paso 2: Declaro su useState y declaron su valor en 0 
    const [ animacion ] = useState( new Animated.Value(0) );


    //Paso 3: Declaro useEffect para que al menos inicie la primera ves 
    useEffect(() => {
        Animated.timing(
            animacion, {
                toValue: 1,  // al valor al que llega
                duration: 1500, // cantidad de tiempo en llegar
                useNativeDriver: false,
            }
        ).start(); // iniciar la animación
    }, []);

    //Paso 4: Se debe DEFINIR EL  css (texto) que tendra la animacion esto es importante ya que aqui seran los valores de 0 al establecido en el anime 
    //Paso 5: Se debe incorporar a quien se debe incluir la animacion 
    return ( 
        <Animated.View
            style={{
                opacity: animacion
            }}
        >
            
            <Text style={styles.texto}>Animacion 1</Text>
        </Animated.View>
     );
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 30,
        textAlign: 'center', 
        backgroundColor:'red',
    }
})
 
export default Animacion1;