import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

const Animacion2 = () => {

    const [ animacion ] = useState( new Animated.Value(0) );

    useEffect(() => {
        Animated.timing(
            animacion, {
                toValue: 400,  // al valor al que llega
                duration: 1500,
                useNativeDriver: false, // cantidad de tiempo en llegar
            }
        ).start(); // iniciar la animación
    }, []);


    return ( 
        <Animated.View


            style={[
                styles.caja,
                { 
                    width: animacion,
                    
                }
            ]}
        >
            <Text style={StyleSheet.texto}>Animacion 02</Text>

        </Animated.View>
     );
}

const styles = StyleSheet.create({
    caja: {
        backgroundColor: 'cornflowerblue'
    }, 
    texto:{
        height:200,
        fontWeight:'bold',
        position:'absolute',
    }
})
 
export default Animacion2;