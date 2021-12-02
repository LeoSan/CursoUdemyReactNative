//Importar Librerias 
import React ,  {Fragment} from 'react';
import { StyleSheet, Alert } from 'react-native'
import { Text, ListItem, Left, Right, Icon, Toast } from 'native-base'

//Importo Apollo client 
import { gql, useMutation } from '@apollo/client';


//Metodos GraphQL 
    //Permite Actualizar la tarea 
    const ACTUALIZAR_TAREA = gql`
        mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean ) {
            actualizarTarea(id: $id, input: $input, estado: $estado) {
                nombre
                id
                proyecto
                estado
            }
        }
    `;

    //Permite Eliminar la tarea 
    const ELIMINAR_TAREA = gql`
        mutation  eliminarTarea($id: ID!) {
            eliminarTarea(id: $id)
        }
    `

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

const Tarea = ({tarea, proyectoId}) => {

    // Declaración Use Mutaciones 
    const [ actualizarTarea ] = useMutation(ACTUALIZAR_TAREA);
    
    const [ eliminarTarea ] = useMutation(ELIMINAR_TAREA, {
        //Esto es para actualizar el cache 
        //update es parametro de entrada por defecto 
        update(cache) {
            const { obtenerTareas } = cache.readQuery({//Permite leer cache 
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: proyectoId
                    }
                }
            });

            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: proyectoId
                    }
                }, 
                data: {
                    obtenerTareas: obtenerTareas.filter( tareaActual => tareaActual.id !== tarea.id )
                }
            })
        }
    });

    //Metodos Funcionales 
    // Cambia el estado de una tarea a completo o incompleto
    const cambiarEstado = async () => {

        // obtener el ID de la tarea
        const { id } = tarea
        console.log(!tarea.estado); // Esto permite cambiar de manera automática el estado tu sabes el inverso 

        try {
            const { data } = await actualizarTarea({
                variables : {
                    id, 
                    input: {
                        nombre: tarea.nombre
                    },
                    estado: !tarea.estado
                }
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    // Dialogo para eliminar o no una tarea
    const mostrarEliminar = () => {
        Alert.alert('Eliminar Tarea', '¿Deseas eliminar esta tarea?', [
            {
                text: 'Cancelar', 
                style: 'cancel'
            }, 
            {
                text: 'Confirmar',
                onPress: () => eliminarTareaDB()
            }
        ])
    }

    // Eliminar tarea de la base de datos

    const eliminarTareaDB = async () => {
        const { id } = tarea;

        try {
            const { data } = await eliminarTarea({
                variables: {
                    id // Debes poner el mismo nombre que usaste en el shema y en el resolver 
                }
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Fragment>  
            <ListItem
                onPress={ () => cambiarEstado()  }
                onLongPress={ () => mostrarEliminar()   }
            >
                <Left>
                    <Text>{tarea.nombre}</Text>
                </Left>

                <Right>
                   { tarea.estado ? (
                        <Icon
                            style={[styles.icono, styles.completo]}
                            name="ios-checkmark-circle"
                        />
                   ) : (
                        <Icon
                            style={[styles.icono, styles.incompleto]}
                            name="ios-checkmark-circle"
                        />
                   )}
                </Right>
            </ListItem>

        </Fragment>
     );
}

const styles = StyleSheet.create({
    icono: {
        fontSize: 32
    },
    completo: {
        color: 'green'
    },
    incompleto: {
        color: '#E1E1E1'
    }
})
 
export default Tarea;