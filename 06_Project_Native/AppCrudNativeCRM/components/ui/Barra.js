import React from 'react';
import { Button } from 'react-native-paper'; //Recuerda este 
//boton es de paper si importas un boton de React-native debes colocar un alias porque dara conflictos

const BarraSuperior = ( { navigation, route} )=>{


//Listado de Eventos 

    //Evento para Crear Cliente 
    const eventoPress = ()=>{
        navigation.navigate('NuevoCliente');
    }


    //Salida del boton 
    return (
        //Este icons es para iconawesone 
        <Button icon="plus-circle" color="#FFF" onPress={ ()=>eventoPress()  }>
            Cliente 
        </Button>
    );

}

export default BarraSuperior; 