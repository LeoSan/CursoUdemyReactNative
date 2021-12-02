//Importo Librerias React  y Native 
import React, { useState } from 'react';
import { Container, Button, Text, H2, Content, List, Form, Item, Input, Toast } from 'native-base'
import { StyleSheet } from 'react-native'

//Importo css
import globalStyles from '../styles/global';

// Apollo 
import { gql, useMutation, useQuery } from '@apollo/client'

//Importo componentes 
import Tarea from '../components/Tarea'

//Metodos QraphQL
    // Crea nuevas tareas
    const NUEVA_TAREA = gql`
        mutation nuevaTarea($input: TareaInput) {
            nuevaTarea(input: $input ) {
                nombre
                id
                proyecto
                estado
            }
        }
    `;

    // Consulta las tareas del proyecto
    const OBTENER_TAREAS = gql`
        query obtenerTareas($input: ProyectoIDInput) {
            obtenerTareas(input: $input) {
                id
                nombre
                estado
            }
        }
    `;

const Proyecto = ({route}) => {

    // obtiene el iD del proyecto
    const { id } = route.params; //Leonard: super importante asi se recibe lo que se envia a traves del navigation

    // Declaración de UseState 
    const [ nombre, guardarNombre] = useState('');
    const [ mensaje, guardarMensaje] = useState(null);


    // Query de apollo
    // apollo obtener tareas
    const { data, loading, error } = useQuery(OBTENER_TAREAS, { //Nota cuando usamos query usamos llaves  {}
        variables: {
            input: {//Recuerda que input es el  nombre de variable que le pusimos en el resolver 
                proyecto: id
            }
        }
    });

    console.log(data);

    // Apollo crear tareas
    const [ nuevaTarea ] = useMutation(NUEVA_TAREA, { 
        //Forma para refrescar la cache esto es para poder ver la actualización en interfaz 
        //update es parametro de entrada por defecto 
        update(cache, { data: { nuevaTarea }}) {
            const { obtenerTareas } = cache.readQuery({//Permite leer desde cache   (obtenerTareas ) A fuerza debe poner el mismo nombre que esta en la cache de apollo forma de verlo es usando debugin y buscar este simbolo  >> y buscar apollo como opción 
                query: OBTENER_TAREAS, 
                variables: {
                    input: {
                        proyecto: id
                    }
                }
            });

            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id
                    }
                },
                data: {
                    obtenerTareas: [...obtenerTareas,nuevaTarea  ] // Forma modenar usando el spret  // Aqui tomas el objeto cache y le actualizas los datos con el nuevo valor
                }
            })
        }
    });
    
    //Declaro Funciones 
    //Metodo : Permite crear tarea de los proyectos 
    const handleSubmit = async () => {
        if(nombre === '') {
            guardarMensaje('El Nombre de la tarea es obligatorio');
            return;
        }

        // almacenarlo en la base de datos

        try {
            const { data } = await nuevaTarea({
                variables: {
                    input: {//Esta variable  tiene que ser igual a la que definiste en el resolver 
                        nombre, 
                        proyecto:  id
                    }
                }
            });
            console.log(data);
            guardarNombre('');
            guardarMensaje('Tarea creada Correctamente');

            setTimeout(() => {
                guardarMensaje(null);
            }, 3000);
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error:', '' )); // Muestra los mensajes usando toast 
            console.log(error);
        }
    }
    //Metodo :  Permite Imprimir el mensaje usando un toast 
    // muestra un mensaje toast
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje, 
            buttonText: 'OK',
            duration: 5000
        })
    }

    // Si apollo esta consultando
    if(loading) return <Text>Cargando...</Text>

    return (
        <Container style={[globalStyles.contenedor], { backgroundColor: '#512DA8' }}>
            <Form style={{ marginHorizontal: '2.5%', marginTop: 20}}>
                <Item inlineLabel last style={globalStyles.input}>
                    <Input 
                        placeholder="Nombre Tarea"
                        value={nombre}
                        onChangeText={ texto => guardarNombre(texto) }
                    />
                </Item>

                <Button
                    style={globalStyles.boton}
                    square
                    block
                    onPress={() => handleSubmit() }
                >
                    <Text style={globalStyles.botonTexto} >Crear Tarea</Text>
                </Button>
            </Form>

            <H2 style={globalStyles.subtitulo}>Tareas: {route.params.nombre} </H2>

            <Content>
                <List style={styles.contenido}>
                    {data.obtenerTareas.map(tarea => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            proyectoId={id}
                        />
                    )) }
                </List>
            </Content>

            {mensaje && mostrarAlerta() }
        </Container>
     );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }
})
 
export default Proyecto;