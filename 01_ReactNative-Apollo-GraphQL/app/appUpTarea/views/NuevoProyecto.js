//Importo Librerias React  y Native 
import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Form, Item, Input, Toast  } from 'native-base';

//Importo css
import globalStyles from '../styles/global';
//Importo Libreria para nevegación 
import { useNavigation } from '@react-navigation/native';

// Apollo Cliente 
import { gql, useMutation } from '@apollo/client';

//Metodos QraphQL
    //Metoodo crea nuevo proyecto 
    const NUEVO_PROYECTO = gql`
        mutation nuevoProyecto($input: ProyectoInput ) {
            nuevoProyecto(input : $input){
                nombre
                id
            }
        }
    `;

    // Actualizar el cache Esto es para actualizar y refrescar cad ves que se mete un nuevo datos 
    const OBTENER_PROYECTOS = gql`
        query obtenerProyectos { 
            obtenerProyectos {
                id
                nombre
            }
        }
    `;

const NuevoProyecto = () => {

    // navigation
    const navigation = useNavigation();

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [mensaje, guardarMensaje] = useState(null);

    // Apollo
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {//Nota: cuando usamos Mutacion usamos corchetes []
        //Esto es para refrescar tus valores al ingresar uno nuevo 
        update(cache, { data: { nuevoProyecto }}) {
            const { obtenerProyectos } = cache.readQuery({ query: OBTENER_PROYECTOS }); // ReadQUery nos permite leer 
            cache.writeQuery({
                query: OBTENER_PROYECTOS,
                data: { obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) } // Aqui tomas el objeto cache y le actualizas los datos con el nuevo valor  forma vieja 
            })
        }
    });

    // Validar crear proyecto
    const handleSubmit = async () => {
        if(nombre === '') {
            guardarMensaje('El Nombre del Proyecto es Obligatorio');
            return;
        }

        // Guardar el Proyecto en la base de datos

        try {
            const { data } = await nuevoProyecto({
                variables: {
                    input: {//Esta variable  tiene que ser igual a la que definiste en el resolver 
                        nombre
                    }
                }
            });
            // console.log(data);
            guardarMensaje('Proyecto Creado Correctamente');
            navigation.navigate("Proyectos"); // Redirecciona  al componente Proyectos 

        } catch (error) {
            // console.log(error);
            guardarMensaje(error.message.replace('GraphQL error:', '' )); // Muestra los mensajes usando toast 
        }
    }

    // muestra un mensaje toast
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }


    return ( 
        <Container style={[ globalStyles.contenedor ], { backgroundColor: '#512DA8'}}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.subtitulo}>Nuevo Proyecto</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input} >
                        <Input
                            placeholder="Nombre del Proyecto"
                            onChangeText={ texto => guardarNombre(texto) }
                        />
                    </Item>
                </Form>

                <Button
                    style={[globalStyles.boton, { marginTop: 30}]}
                    square
                    block
                    onPress={ () => handleSubmit() }
                >
                    <Text style={globalStyles.botonTexto}>Crear Proyecto</Text>
                </Button>


                {mensaje && mostrarAlerta()}
            </View>
        </Container>
     );
}
 
export default NuevoProyecto;