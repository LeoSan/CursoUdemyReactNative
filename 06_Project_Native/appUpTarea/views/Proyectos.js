//Importo Librerias React  y Native 
import React from 'react';
import {  StyleSheet } from 'react-native'
import { Container, Button, Text, H2, Content, List, ListItem, Left, Right } from 'native-base';

//Importo css
import globalStyles from '../styles/global';

//Importo Libreria para nevegación 
import { useNavigation } from '@react-navigation/native';

// Apollo Ciente 
import { gql, useQuery } from '@apollo/client'; // Para las consultas usamos UseQuerry Nota 


//Metodos QraphQL
    //Permite consultar el listado de proyectos 
    const OBTENER_PROYECTOS = gql`
        query obtenerProyectos { 
            obtenerProyectos {
                id
                nombre
            }
        }
    `;

const Proyectos = () => {

    const navigation = useNavigation();

    // Apollo
    const { data, loading, error } = useQuery(OBTENER_PROYECTOS); // ObjetcDistrochorin  para extraer valores o metodos {}

    console.log(data);  // Datos de la consulta 
    console.log(loading); // Es true cuando termina la consulta bueno para estados de gif de carga
    console.log(error); // Error se muestra cuando la consulta falla 

    if(loading) return <Text>Cargando...</Text>


    return ( 
        <Container style={[ globalStyles.contenedor ], { backgroundColor: '#512DA8'}}>
            <Button
                style={[globalStyles.boton, { marginTop: 30}]}
                square
                block
                onPress={ () => navigation.navigate("NuevoProyecto") }
            >
                <Text style={globalStyles.botonTexto}>Nuevo Proyecto</Text>
            </Button>

            <H2 style={globalStyles.subtitulo}>Selecciona un Proyecto</H2>

            {
                //Aqui Inicia la iteración para la consulta 
            }

            <Content>
                <List style={styles.contenido}>
                    {data.obtenerProyectos.map(proyecto => (
                        <ListItem
                            key={proyecto.id}
                            onPress={ () => navigation.navigate("Proyecto", proyecto) /*Leonard: Super importante forma de enviar objeto usando navigate*/  }
                        >
                            <Left>
                                <Text>{proyecto.nombre} </Text>
                            </Left>
                            <Right  style={globalStyles.fecha}>
                                <Text> {proyecto.creado}  </Text>
                            </Right>
                        </ListItem>
                    ))}

                </List>
            </Content>
        </Container>
     );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }
})
 
export default Proyectos;