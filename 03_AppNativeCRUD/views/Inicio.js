import React, {useEffect, useState} from 'react';
import { View, Text, Platform, FlatList, StyleSheet} from 'react-native';

// Importando paper
import {Headline ,List ,Button, FAB} from 'react-native-paper';

// Importando axios
import axios from 'axios';

// importando estilos globales
import globalStyles from '../styles/global';


const Inicio = ( { navigation, route } )=>{ //Esto Permite usar las propiedades de navegacion 
    /*Nota* -> Todo lo que pases en los componentes como props, se debe leer en el route */


    //State de la APP 
    const [clientes, setClientes] = useState([]);
    const [consultarAPI, setConsultarAPI] = useState(true);


    useEffect( () =>{

        const getClientesAPI = async () =>{

            try {
                   // Para Android
                    const resultado = await axios.get('http://192.168.0.9:5000/clientes');
                    /**Nota:  para android es el localhost que tiene tu maquina*/
                     console.log("Cliente HP");
                     console.log(resultado.data);

                    // Guardar clientes 
                    setClientes(resultado.data);
                    setConsultarAPI(false);

            } catch (error) {
                console.log(error);   
            }

        }

        //Nota-> Personal siempre llamar este metodo fuera de la función 

        if (consultarAPI){
            getClientesAPI();
            setConsultarAPI(false); // veolvemos a false
        }

    }, [consultarAPI] );


return (

    <View>
        <Text style={styles.contenedor}>Inicio</Text>

            {/* Botton  */}

            <Button icon="plus-circle"
                onPress={ ()=> navigation.navigate('NuevoCliente', {setConsultarAPI}) }
                >Nuevo Cliente
            </Button>
            
            
            {/* Cabecera conficionada */}
            <Headline
                style={globalStyles.titulo}
            > {clientes.length > 0 ? 'Clientes' : 'Aún no hay Cliente'}</Headline>

            {/* Listando clientes */}
            <FlatList 
                data={clientes}
                keyExtractor={ leo => ( leo.id).toString() } //  Colocando el id unico en string
                renderItem={ ({item}) => (   // item variable temporal que crea flatlist
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress={() => navigation.navigate('DetalleCliente', { item, setConsultarAPI })} // vista detalle
                    /> // Componente similiar al flalist
                )}

                /**
                 * Nota: Render item es lo que va hacer que se vean los resultados
                 */
            />
            {/* // Agregando boton  fab*/}
            <FAB 
                icon="plus"
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', {setConsultarAPI})}
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

export default Inicio; 