//Importo Libreiras React
import React , {Fragment, useEffect, useState, useContext} from 'react';

//Importo (Conexión  base de datos)
import { FirebaseContext } from '../../firebase';

//Importo Componentes 
import Orden from '../ui/Orden';


const Ordenes = () => {

        //Declaro  useContext: Context con las operaciones de firebase 
        const {firebase } = useContext(FirebaseContext);

        
        //Declaro useState
        const [ordenes, guararOrdenes] = useState();

        //Declaro useEffect
        useEffect(()=>{

            const obtenerOrdenes = ()=>{
                firebase.db.collection('ordenes').where('completado', "==", false).onSnapshot(manejaronSnapshot);

            }    
             obtenerOrdenes();
               
        }, [] );

        //Declaro Metodos de Accion
        //Metodo : Esto es para traer la información de firebase 
        
        //Esta funcion va fuera del useEffet 
        function manejaronSnapshot(snapshot){
                const ordenes = snapshot.docs.map( doc=>{
                        return {
                                id:doc.id,
                                ...doc.data()
                        }
                } );

                guararOrdenes(ordenes);
                console.log(ordenes);

        }
        
    return ( 
            <Fragment>
                    <h1 className="text-3xl font-light mb-4"> Ordenes </h1> 
                       
                        <div className="sm:flex sm:flex-wrap -mx-3">
                        {ordenes.map(orden => (
                                <Orden
                                    key={orden.id}
                                    orden={orden}
                                />
                            ))}
                        </div>

            </Fragment>

     );
}
 
export default Ordenes;