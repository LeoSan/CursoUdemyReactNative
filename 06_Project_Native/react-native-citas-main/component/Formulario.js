import React, {Fragment, useState} from 'react'
import {Text, StyleSheet, View, TextInput, Button, Alert, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Keyboard} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'; 


/**
* @author Leonard Cuenca 
* @function @Formulario
**/

const Formulario = ({citas, setCitas, guardarmostrarForm}) => {

        const [paciente,    guardarPaciente] = useState(''); 
        const [propietario, guardarPropietario] = useState(''); 
        const [telefono,    guardarTelefono] = useState(''); 
        const [sintomas,    guardarsintomas] = useState(''); 
    
        const [fecha, guardarFecha] = useState(''); 
        const [hora,  guardarHora]  = useState('');

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);        
        const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
      
       //Como hacer el pick de Fecha 
        const showDatePicker = () => {
          setDatePickerVisibility(true);
        };
      
        const hideDatePicker = () => {
          setDatePickerVisibility(false);
        };
      
        const handleConfirm = (date) => {
            const opciones ={year:'numeric', month:'long', day:"2-digit"}
            //Formatear fecha 
            console.log(date.toLocaleDateString('es-ES', opciones ));
            guardarFecha(date.toLocaleDateString('es-ES', opciones ));
            hideDatePicker();
        };

        //Como hacer el pick de Tiempo 

    // Muestra u oculta el Time Picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
        guardarHora(hora.toLocaleString('es-UN', opciones));
        console.log(hora);
        hideTimePicker();
    };         


//Evento submit 
const eventoSubmit = ()=>{
    console.log("submit");

    if(paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === ''  || hora.trim() === '' || sintomas.trim() === '' ){
        //Falla 
        console.log("Algo Fallo");
        muestraAlerta();
    }

    const cita = {paciente, propietario, telefono, fecha, hora, sintomas }; 
    cita.id = shortid.generate();

    //Agregar al usestate 
    const citasNuevas = [...citas, cita]
    setCitas(citasNuevas);

    //Ocultar el Formulario y resetear formulario 
    guardarmostrarForm(false);
    
}      

//Mostrar Alerta 
const muestraAlerta =()=>{

    Alert.alert(
        'Error', //titulo
        'Todos los campos son obligatorios', //Mensaje
        [{
            text:'OK'//Arreglo de boton  
        }]
    )

}

const cerrarTeclado =()=>{

    Keyboard.dismiss();

}

  return (
    
    <Fragment>
        <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
            <ScrollView style={styles.scrollView}>        

                    <View>
                        <View style={styles.formulario}>
                            <Text style={styles.label}>Paciente: </Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={ (texto) => guardarPaciente(texto) }
                                keyboardType = 'default'
                            
                            />
                        </View>

                        <View style={styles.formulario}>
                            <Text style={styles.label}>Propietario: </Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={ (texto) => guardarPropietario(texto) }
                                keyboardType = 'default'
                            
                            />
                        </View>

                        <View style={styles.formulario}>
                            <Text style={styles.label}>Telefono: </Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={ (texto) => guardarTelefono(texto) }
                                keyboardType = 'numeric'
                            
                            />
                        </View>  
                        
                        <View style={styles.formulario}>
                            <Text style={styles.label}>Sintomas: </Text>
                            <TextInput 
                                multiline
                                style={styles.input}
                                onChangeText={ (texto) => guardarsintomas(texto) }
                                
                            
                            />
                        </View>  

                        <View>
                            <Button title="Agenda Tu Fecha" onPress={showDatePicker} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                locale='es_ES'
                            />

                        <Text >{fecha}: </Text>
                        </View>        
                        <View>
                            <Button title="Seleccionar Hora" onPress={showTimePicker} />
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={confirmarHora}
                                onCancel={hideTimePicker}
                                locale='es_ES'

                            />
                            <Text>{hora}: </Text>
                        </View>
                        <View>
                            <TouchableHighlight style={styles.btnSubmit} onPress={ () => eventoSubmit() }>
                                    <Text style={styles.TextoSubmit}> Guardar &times;</Text>
                            </TouchableHighlight>
                        </View>                        
                            
                    </View>

            </ScrollView>
        </TouchableWithoutFeedback>
    </Fragment>
    )
  }

   const styles = StyleSheet.create ({
    label: {
        fontWeight:'bold', 
        fontSize:18, 
        marginTop:20, 
        
    },
    input:{
        marginTop:10, 
        height:50, 
        borderColor:'#E1E1E1', 
        borderWidth:1, 
        borderStyle:'solid',
        borderTopEndRadius:5,
        borderTopStartRadius:5, 
        borderTopLeftRadius:5, 
        borderTopRightRadius:5,
        backgroundColor:'#FFF'
    }, 
    formulario:{
        paddingHorizontal:10, 
        //paddingVertical:10, 
        backgroundColor:'#969faf', 
        
    }, 
    container: {
        flex: 1,
        paddingTop: 10,
      },
    scrollView: {
        backgroundColor:'#969faf', 
        marginHorizontal: 20,
      },
      btnSubmit:{
        padding:10, 
        backgroundColor:'#4630eb',
        marginVertical:10, 

    },      
    TextoSubmit:{
        color:'#FFF',
        fontWeight:'bold', 
        textAlign:'center',
    }    

  });

export default Formulario;