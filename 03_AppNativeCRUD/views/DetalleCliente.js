import React from 'react';

import { View, StyleSheet, Alert} from  'react-native';
// Importando paper
import { Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';

// Importando axios
import axios from 'axios';


/*INICIO */

const DetalleCliente = ( { navigation, route } )=>{ //Esto Permite usar las propiedades de navegacion 


    //Distrosioring 
    const { nombre, telefono, correo, empresa, id  } = route.params.item; 

        // Extrayendo metodos
        const { setConsultarAPI } = route.params;

//Eventos Lis 

        //Mostrar Confirmacion 
        const mostrarConfirm = () =>{
            Alert.alert(
                'Deseas Eliminar este cliente',
                'Contacto Elminado no se puede recuperar',
                [
                   { text:'Si, Eliminar', onPress:()=> eliminarContacto() },
                   { text:'Cancelar', style:'cancel' }
                ]
            )
        }

        //evento eliminar
        const eliminarContacto = async ()=>{
            console.log("Eliminando");

            const url= `http://192.168.0.9:5000/clientes/${id}`;
    
            try {
                 await axios.delete(url);
            } catch (error) {
                console.log(error)
            }
    
            // Redirecionar 
            navigation.navigate('Inicio');
    
            //volver a consultar el api
            setConsultarAPI(true);

        }


return (
    <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}> <Subheading>{nombre}</Subheading></Headline>
            <Text style={globalStyles.texto}> Empresa  : <Subheading>{empresa}</Subheading> </Text>
            <Text style={globalStyles.texto}> Correo   : <Subheading>{correo}</Subheading> </Text>
            <Text style={globalStyles.texto}> Teléfono : <Subheading>{telefono}</Subheading> </Text>
            <Button 
                    icon="cancel" 
                    mode="contained"
                    style={globalStyles.btnEliminar}
                    onPress={ ()=> mostrarConfirm() }
            >
                    Eiminar cliente
            </Button>

            <FAB 
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', { cliente: route.params.item,  setConsultarAPI})}
                >

            </FAB>            
       </View>

    
);

}

const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
    },
  });

export default DetalleCliente; 