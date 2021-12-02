import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform} from  'react-native';
import { Button as Btn, Headline, TextInput, Paragraph, Dialog, Portal  } from 'react-native-paper'; //Recuerda este 
//boton es de paper si importas un boton de React-native debes colocar un alias porque dara conflictos

//Importo estilo gobal 
import globalStyles from '../styles/global';

// Importando axios
import axios from 'axios';


const NuevoCliente = ( {navigation, route} )=>{ //Esto Permite usar las propiedades de navegacion 
    /*Nota* -> Todo lo que pases en los componentes como props, se debe leer en el route */
    //console.log(route.params);
    const { setConsultarAPI } = route.params;
    
    const [nombre,   setNombre ]   = useState('');
    const [telefono, setTelefono ] = useState('');
    const [correo,   setCorreo ]   = useState('');
    const [empresa,  setEmpresa ]  = useState('');
    const [alerta,   setAlerta ]  = useState(false);

   // console.log( navigation ); //Aqui podemos ver las funciones de navegacion esto se debe investigar 

    //Detectar si carga o edita el cliente 

    useEffect( ()=>{

        if(route.params.cliente){
                    console.log(`Estamos Editando`);
                    const { nombre, telefono, correo, empresa, id} = route.params.cliente;
                    //Enviando al state
                    setNombre(nombre);
                    setTelefono(telefono);
                    setCorreo(correo);
                    setEmpresa(empresa);
                }


    }, [] )

//Listado de eventos 

    //Evento Guardar Cliente  

    const setCliente = async ()=>{
        //Validar 
        if (nombre === '' || telefono === '' || correo === '' || empresa === ''){
            console.log("Hay campos vacios");
            setAlerta(true);
            return;  
        }
        //Generar el cliente

        const cliente = { nombre, telefono, correo, empresa };
        console.log(cliente);


        // Si Estamos editando o creando
        if(route.params.cliente){
            // Editando
            
            // Extraemos ID
            const { id } = route.params.cliente;

            // Asignamos el id
            cliente.id = id;
            //Ip de mi maquina en este tiempo 192.168.0.9
            const url= `http://192.168.0.9:5000/clientes/${id}`; 

            try {
                await axios.put(url ,cliente);
            } catch (error) {
                console.log(error)
            }

        }else{
                    //guardar cliente en la API
                    // Guardar cliente en el api
                    try {
                            
                    if(Platform.OS === 'ios'){
                        // Para IOS
                        await axios.post('http://localhost:3000/clientes', cliente);
                        /*
                            nota: para ios es el local host que te de tu api
                        */
                    }else{
                        // Para Android
                        //await axios.post('http://192.168.1.2:3000/clientes', cliente);
                        //await axios.post('http://192.168.1.0:3000/clientes', cliente);
                        await axios.post('http://192.168.0.9:5000/clientes', cliente);
                        /**
                         *  Nota:  para android es el localhost que tiene tu maquina
                         */
                    }

                    } catch (error) {
                        console.log(error)
                    }
        }
        
          // Redirecconar
          navigation.navigate('Inicio');

        //Limpiar el form 
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEmpresa('');

         // Cambiar a true para traernos el nuevo clientes, esto cambia el estado
        setConsultarAPI(true);
    }
return (
    
        <View  style = {globalStyles.contenedor}>
                <Headline 
                    style = {globalStyles.titulo}>
                    Añadir Nuevo cliente
                </Headline>
                <TextInput 
                    label="Nombre"
                    placeholder="Ingrese Nombre"
                    onChangeText={ (texto)=>setNombre(texto) }
                    value={nombre}
                    style={styles.input}
                />
                <TextInput 
                    label="Teléfono"
                    placeholder="Ingrese Teléfono"
                    onChangeText={ (texto)=>setTelefono(texto) }
                    value={telefono}
                    style={styles.input}
                />                
                <TextInput 
                    label="Correo"
                    placeholder="Ingrese Correo"
                    onChangeText={ (texto)=>setCorreo(texto) }
                    value={correo}
                    style={styles.input}
                />                
                <TextInput 
                    label="Empresa"
                    placeholder="Ingrese Empresa"
                    onChangeText={ (texto)=>setEmpresa(texto) }
                    value={empresa}
                    style={styles.input}
                />
                

                <Btn 
                    title="Guardar Cliente" 
                    icon="pencil-circle"
                    mode="contained"  
                    onPress={ ()=> setCliente() }
                />
                    {/* // Alerta */}
                    <Portal>
                    <Dialog
                        // Pros del dialog
                        visible={alerta} // nota: propiedad por default es false para mantener oculto

                        onDismiss={() =>  setAlerta(false)} //nota:  Usamos onDismiss para ocultar en cualquier espacio de pantalla que se toque 
                    >
                        <Dialog.Title>Error</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Todos los campos son obligatorios</Paragraph>
                            {/* Nota: paragraps hace los texto pequeños */}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Btn onPress={() => setAlerta(false)}>Ok</Btn>
                        </Dialog.Actions>
                    </Dialog>
</Portal>

    </View>
    
);

}

const styles = StyleSheet.create({
    input: {
        marginBottom:20,
        backgroundColor:'transparent',

    },
  });

export default NuevoCliente; 