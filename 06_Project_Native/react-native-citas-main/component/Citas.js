/**
* @author
* @function Citas
**/

import React from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
 
// rnfc
const Citas = ({item, eliminaPaciente}) => {

const dialogoEliminar =  id =>{
    console.log("Eliminar ...", id);
    //Llamamos la funcion ya que lo enviamos via props
    eliminaPaciente(id);

}

    return(
        <View style={styles.cita}>     
            <View > 
                <Text style={styles.label}> Paciente:</Text>
                <Text style={styles.texto}> {item.paciente}</Text>
            </View>
            <View > 
                <Text style={styles.label}> propietario:</Text>
                <Text style={styles.texto}> {item.propietario}</Text>
            </View>
            <View > 
                <Text style={styles.label}> sintomas:</Text>
                <Text style={styles.texto}> {item.sintomas}</Text>
            </View>
            <Button onPress={ () => dialogoEliminar(item.id) }
                title="Eliminar"
            />
            <View>
                <TouchableHighlight style={styles.btnEliminar} onPress={ () => dialogoEliminar(item.id) }>
                    <Text style={styles.TextoEliminar}> Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>    
  )
}//Fin dela funcion 

/*Creamos nuestros Estilos StyleSheet*/

const styles = StyleSheet.create({
    cita:{
        backgroundColor:'#FFF', 
        borderBottomColor:'#E1E1E1',
        borderStyle:'solid',
        borderBottomEndRadius:3,
        borderBottomWidth:1,
        paddingVertical:20, 
        paddingHorizontal:10
    }, 
    label:{
        fontWeight:'bold', 
        fontSize:18,
        marginTop:20, 

    }, 
    texto:{
        fontSize:18,

    }, 
    btnEliminar:{
        padding:10, 
        backgroundColor:'#4630eb',
        marginVertical:10, 

    },
    TextoEliminar:{
        color:'#FFF',
        fontWeight:'bold', 
        textAlign:'center',

    }

})

export default Citas;