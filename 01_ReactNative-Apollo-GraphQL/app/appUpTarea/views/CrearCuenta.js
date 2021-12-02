//Librerias React 
import React, {useState} from 'react';
import {View} from 'react-native';

//Importo objets nativos de Native BAse 
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native'
//Importo Clase Global Css 
import globalStyles from '../styles/global';

// Apollo useMutation Hook Nuevo 
import { gql, useMutation } from '@apollo/client'; // Se debio instalar previamente  revisa el leeme 

//Apollo  cliente 
//Aqui usamos la mutacion que creamos en el schema  y resolver 
//Apollo -> Creamos los metodos que creamos previamente en el GraphQL  

//Metodos QraphQL
    const NUEVA_CUENTA = gql`
        mutation crearUsuario($input: UsuarioInput) {
            crearUsuario(input:$input)
        }
    `;

const CrearCuenta = () => {

    //Declaro Usetate 
    const [nombre,   guardarNombre]   = useState('');
    const [email,    guardarEmail]    = useState('');
    const [password, guardarPassword] = useState('');

    const [mensaje, guardarMensaje] = useState(null);


    //Declaro Hook 
        // React navigation
        const navigation = useNavigation();

        //Declaro UseEffet 

        // Mutation de apollo
        const [ crearUsuario ] = useMutation(NUEVA_CUENTA);



    //Declaro Funciones 
    //Metodo :  Permite validar enviar información al servidor 

     // Cuando el usuario presiona en crear cuenta
     const handleSubmit = async () => {
        // validar
        if(nombre === '' || email === '' || password === '') {
            // Mostrar un error
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }

        // password al menos 6 caracteres
        if(password.length < 6) {
            guardarMensaje('El password debe ser de al menos 6 caracteres');
            return;
        }

        try {
           //Aqui es la forma de como se comunica con el servidor Apollo 
            const { data } = await crearUsuario({
                variables: {

                    //Aqui las variables 
                    input: {//Esta variable  tiene que ser igual a la que definiste en el resolver 
                        nombre, //Nota en Js llave valor tienen el mismo nombre puedes usarlo tal cual Nuevo 
                        email,
                        password:password // forma Vieja 
                    }


                }
            });
            //Data -> deira  es la respuesta del servidor  
            guardarMensaje(data.crearUsuario);
            navigation.navigate('Login');
            
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error: ', ''));
        }
    }//Fin del Validador 

    //Metodo :  Permite Imprimir el mensaje usando un toast 
    // muestra un mensaje toast
    const mostrarAlerta = () => {
            Toast.show({
                text: mensaje,
                buttonText: 'OK',
                duration: 8000
            })
    }



    return ( 
        <Container style={ [ globalStyles.contenedor,  { backgroundColor: '#512DA8' }]}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>UpTask</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input} >
                        <Input 
                            placeholder="Nombre"
                            onChangeText={ texto => guardarNombre(texto) }
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input} >
                        <Input 
                            placeholder="Email"
                            onChangeText={ texto => guardarEmail(texto) }
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input} >
                        <Input 
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={ texto => guardarPassword(texto) }
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={globalStyles.boton}
                    onPress={ () => handleSubmit() }
                >
                    <Text
                        style={globalStyles.botonTexto}
                    >Crear Cuenta</Text>
                </Button>

                {mensaje && mostrarAlerta()}
            </View>
        </Container>
     );
}
 
export default  CrearCuenta;