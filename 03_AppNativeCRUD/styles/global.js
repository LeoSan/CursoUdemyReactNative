import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

    contenedor:{
        flex:1,
        marginTop:20,
        marginHorizontal:'2.5%'
    },  
    titulo:{
        textAlign:'center',
        marginBottom: 30,
        marginTop: 20,
        fontSize: 30

    },
    fab:{
        position: 'absolute',
        margin: 30, 
        right: 0,
        bottom: 85
    },
    texto:{
        marginBottom:20,
        fontSize:18
    },  
    btnEliminar:{
        marginTop:100,
        backgroundColor:'red'
    }


});

export default globalStyles;
