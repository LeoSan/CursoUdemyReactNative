//Importar Librerias 
import React, { useState } from 'react';
import {View} from 'react-native';

//Importo objets nativos de deBAse 
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native'
//Importo libreria 
import globalStyles from '../styles/global';

// Importo  Esto es para poder usar loca Storage 
import AsyncStorage from '@react-native-community/async-storage';

// Apollo Cliente 
// Paso 1:  Importo 
import { gql, useMutation } from '@apollo/client'; // Para eventos usamos useMutation 

//Metodos QraphQL
//// Paso 2:  Luego de validarlos en el GraphyCall ponemos  nuetsros metodos aquí 
const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input ) {
        token
        }
    }
`;

const Login = () => {

    //Declaro Usetate 
        // State del formulario
        const [email, guardarEmail] = useState('');
        const [password, guardarPassword] = useState('');
    
        const [mensaje, guardarMensaje] = useState(null);


    //Declaro Hook 
        // React navigation
        const navigation = useNavigation();

        // Mutation de apollo
        //// Paso 3:  Luego de importar nuestro useMutatae lo podemos declarar 
        const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO); // ArraysDistrochorin  para extraer valores o metodos []

    //Declaro UseEffet 


    //Declaro Funciones 
    //Metodo : Cuando el usuario presiona en iniciar sesion
        const handleSubmit = async () => {
            // validar
            if(  email === '' || password === '') {
                // Mostrar un error
                guardarMensaje('Todos los campos son obligatorios');
                return;
            }
    
            try {

                // autenticar el usuario
                //// Paso 4:  Luego de declararlo que es el paso 3 podemos implementarlo y pasarle las variables del formulario 
                const { data } = await autenticarUsuario({
                    variables: {
                        input: {//Esta variable  tiene que ser igual a la que definiste en el resolver 
                            email,
                            password
                        }
                    }
                });
                //// Paso 5:  Podemos hacer rsto para retornar el valor 
                const { token  } = data.autenticarUsuario;
    
                // Colocar token en storage
                await AsyncStorage.setItem('token', token); // Asi se guarda y genera un token en react - native
    
                // Redireccionar a Proyectos
                navigation.navigate("Proyectos");
            } catch (error) {
                // si hay un error mostrarlo
                guardarMensaje(error.message.replace('GraphQL error: ', ''));
    
            }
        }

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
        <Container style={ [globalStyles.contenedor,  { backgroundColor:'#512DA8' }]} >
        <View style={ globalStyles.contenido }>
            <H1 style={ globalStyles.titulo }> UpTask </H1>
            <Form>
                <Item inlineLabel last style={ globalStyles.input } >
                    <Input 
                         autoCompleteType="email"
                         placeholder="Email"
                         onChangeText={texto => guardarEmail(texto.toLowerCase() ) }
                         
                    />                    
                
                </Item>
                <Item inlineLabel last style={ globalStyles.input }>
                    <Input 
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={texto => guardarPassword(texto) }
                    />                   
            
                </Item>

            </Form>

            <Button
                square
                block
                style={globalStyles.boton}
                onPress={() => handleSubmit() }
              >
                <Text
                    style={globalStyles.botonTexto}
                >Iniciar Sesión
                </Text>
            </Button>

            <Text 
                    onPress={ () => navigation.navigate("CrearCuenta") }
                    style={globalStyles.enlace}
                >Crear Cuenta</Text>

                {mensaje && mostrarAlerta()}
        </View>        
    </Container>
     );
}
 
export default  Login;