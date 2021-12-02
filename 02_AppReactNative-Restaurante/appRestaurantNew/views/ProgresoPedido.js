//Importo Librerias 
import React, {useContext, useEffect, useState, Fragment} from 'react';
import { View, StyleSheet } from 'react-native';

import {
    Container,
    Content, 
    List,
    ListItem,
    Thumbnail, 
    Text,
    Left, 
    Body,
    Button,
    H1, 
    H3,
    Footer, 
    FooterTab
} from 'native-base';
//Importo estilos Css 
import globalStyles from '../styles/global';

//Importamos la navigation 
import { useNavigation } from '@react-navigation/native';

//Importo el context 
import PedidoContext from '../context/pedidos/pedidosContext';

//Importo Firebase
import firebase from '../firebase';

//Importo librerias que permite ahacer una animacion countDown
import Countdown from 'react-countdown';

//Importo Vistas 


const ProgesoPedido = () => {
    //Declaro Variables 
    const navigation = useNavigation();

    //Declaro State 

    const [ tiempo, guardarTiempo] = useState(0);
    const [ completado, guardarCompletado] = useState(false);
    

     //Declaro Context 
     const { idpedido } = useContext(PedidoContext);


     //Delaro useEffect 

     useEffect( ()=>{
        const obtenerProducto = ()=>{
                firebase.db.collection('ordenes')
                .doc(idpedido)
                .onSnapshot(function(doc) {
                    guardarTiempo(doc.data().tiempoentrega);
                    guardarCompletado(doc.data().completado)
                });


        };

        obtenerProducto();

     },[]);


    //Declaro Funcionalidad 
        //Declaro Metodos Accion : Muestra el countDown
        const renderer = ({minutes, seconds}) => {
            return (
                <Text style={styles.tiempo}>{minutes}:{seconds} </Text>
            )
        }
        
        //Declaro Metodos Accion : Describe que hace  

    
    return ( 
        <Container style={globalStyles.contenedor}>
            <View style={[ globalStyles.contenido, { marginTop: 50} ]}>
                { tiempo === 0 && (
                    <Fragment>
                        <Text style={{ textAlign: 'center'}}>Hemos recibido tu orden...</Text>
                        <Text style={{ textAlign: 'center'}}>Estamos calculando el tiempo de entrega</Text>
                    </Fragment>
                    ) 
                } 
                
                { !completado && tiempo > 0 && (
                    <Fragment>
                        <Text style={{ textAlign: 'center'}}>Su orden estará lista en:  </Text>
                        <Text>
                            <Countdown
                                date={ Date.now() + tiempo * 60000 }
                                renderer={renderer}
                            />
                        </Text>
                    </Fragment>
                )}  
                
                { completado && (
                    <Fragment>
                        <H1 style={styles.textoCompletado}>Orden Lista</H1>
                        <H3 style={styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>

                        <Button style={[ globalStyles.boton, { marginTop: 100}]}
                            rounded
                            block
                            onPress={ () => navigation.navigate("NuevaOrden") }
                        >
                            <Text style={globalStyles.botonTexto}>Comenzar Una Orden Nueva</Text>
                        </Button>

                    </Fragment>
                ) }                
            </View>
        </Container>    


       
     );
}
 

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 80,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})
 
export default ProgesoPedido;
