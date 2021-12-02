import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Animated } from 'react-native';

//Uso del Spring tipo libreria para animar 

const Animacion5 = () => {

    const [ animacion ] = useState( new Animated.Value(1));

    const presionarBtn = () => {
        Animated.spring( animacion, {
            toValue: .8,
            useNativeDriver: false,//Esto es para evitar el error 
        } ).start();
    }

    const soltarBtn = () => {
        Animated.spring( animacion, {
            toValue: 1,
            friction: 2, // mas bajo, mayor rebote
            tension: 60,//mas bajo, mayor la suvidad del boton
            useNativeDriver: false,
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacion }]
    }

//No oolvides los arreglos {[styles.btn, estiloAnimacion]}  en el style 

    return ( 
        <View style={styles.contenedor}>
            <TouchableWithoutFeedback
                onPressIn={ () => presionarBtn() }
                onPressOut={ () => soltarBtn() }
            >
                <Animated.View style={[styles.btn, estiloAnimacion]}>
                    <Text style={styles.texto} >Iniciar Sesión</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
     );
}

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center'
    },
    btn: {
        backgroundColor: 'cornflowerblue',
        width: 280,
        height:80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 28
    }
})
 
export default Animacion5;