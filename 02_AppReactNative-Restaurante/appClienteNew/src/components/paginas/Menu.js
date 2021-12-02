//Librerias 
import React , {Fragment, useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

//Vistas  ui 
 import Platillo from '../ui/Platillo';
 import Errors from '../ui/Error';


const Menu = () => {

                //Variables 
                let msjError = 'Ocurrio un detalle en la base de datos, por favor refresca el navegador. ';
        
                // definir el state para los platillos
                const [ platillos, guadarPlatillos ] = useState([]);
                const [ tryerror, setTryerror ] = useState(false);

                const { firebase } = useContext(FirebaseContext);

                // consultar la base de datos al cargar
                useEffect(() => {
                const obtenerPlatillos =  () => {

                        try {
                                firebase.db.collection('productos').onSnapshot(manejarSnapshot);
                        } catch (error) {
                                console.log(error);
                                setTryerror(true);
                        }

                }
                obtenerPlatillos();
                }, []);

                // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
                function manejarSnapshot(snapshot) {
                        const platillos = snapshot.docs.map(doc => {
                        return {
                                id: doc.id,
                                ...doc.data()
                        }
                        });

                        // almacenar los resultados en el state
                        guadarPlatillos(platillos);
                }                

        return ( 
            <Fragment>
                    <h1 className="text-3xl font-light mb-4"> Menu </h1> 
                    <Link to="/nuevo-platillo" className="bg-blue-800 hover::bg-blue-700, incline-block mb-5 p-2 text-white uppercase font-bold ">
                                Agregar Platillo 
                    </Link>

                        {tryerror ? (
                                <Errors mensaje={ msjError } ></Errors>
                                ): 
                                platillos.map( platillo => (
                                        <Platillo
                                        key={platillo.id}
                                        platillo={platillo}
                                        />
                                        ))
                                
         
                        }   
                



            </Fragment>

     );
}
 
export default Menu;