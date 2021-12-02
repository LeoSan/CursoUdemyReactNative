//Librerias 
import React , {Fragment, useContext, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate} from 'react-router-dom';
//Importamos Base de datos 
import {FirebaseContext} from '../../firebase';

//Importamos libreria para subir imagen 
import FileUploader from 'react-firebase-file-uploader';


//componentes UI
import Error from '../ui/Error';

const NuevoPlatillo = () => {

        // state para las imagenes
        const [subiendo, guardarSubiendo] = useState(false);
        const [progreso, guardarProgreso ] = useState(0);
        const [ urlimagen, guardarUrlimagen] = useState('');
                
        
        //Context con las operaciones de Firebase 
        const { firebase } = useContext(FirebaseContext);

        console.log(firebase); //Asi validamos si tenemos habilitado el servicio de tiempo real de firebase 

        //Hook para redireccionar 
        const navigate = useNavigate(); 

        //Validacion y leer los datos

        const formik =useFormik({
                initialValues:{
                        nombre:'',
                        precio:'',
                        categoria:'',
                        imagen:'',
                        descripcion:''
                },
                validationSchema:Yup.object({
                        nombre:Yup.string()
                                .min(5, 'Los Platillos deben tener al menos tres caracteres.')
                                .required('El Campo nombre es obligatorio.'),                         
                        precio:Yup.number()
                                .min(1, 'Debes agregar un monto mayor a 0.')
                                .required('El Campo precio es obligatorio.'), 
                        categoria:Yup.string()
                                .required('El Campo categoria es obligatorio.'), 
                        descripcion:Yup.string()
                                .min(10, 'La descripción debe ser mayor de 10 caracteres .')
                                .required('El Campo descripción es obligatorio.'), 
                }),
                
                onSubmit:platillo=>{
                        
                        try {
                                //esta variable viene del App.js firebase 
                                platillo.existencia = true;

                                //Aqui anexamos la url de la imagen 
                                platillo.imagen = urlimagen;

                                firebase.db.collection('productos').add(platillo);
                                
                                //Redireccionar 
                                navigate('/menu');
                                
                                
                        } catch (error) {
                                console.log(error);                                        
                                console.log(platillo);                                        
                        }
                       
                }

        }); 

    // Metodos para manejo de subida de archivos 
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }
    const handleUploadError = error => {
        guardarSubiendo(false);
        console.log(error);
    }
    const handleUploadSuccess = async nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);

        // Almacenar la URL de destino
        const url = await firebase
                .storage
                .ref("productos")
                .child(nombre)
                .getDownloadURL();

        console.log(url);
        guardarUrlimagen(url);
    }
    const handleProgress = progreso => {
        guardarProgreso(progreso);

        console.log(progreso);
    }        


    return ( 
            <Fragment>
                    <h1 className="text-3xl font-light mb-4"> Agregar Platillo </h1> 

                    <div className="flex justify-center mt-10">
                        <div className="w-full max-w-3xl bg-indigo-100 pl-3 pr-3">
                                      <form onSubmit={formik.handleSubmit} >
                                        <div className="mb-4">
                                                <label 
                                                        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                                                <input 
                                                        id="nombre"
                                                        type="text"
                                                        placeholder="Nombre Platillo"
                                                        value={formik.nombre}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                                />
                                        </div>
                                         
                                            {formik.touched.nombre && formik.errors.nombre ? (
                                                <Error mensaje={ formik.errors.nombre } ></Error>
                                           ): null}     

                                        <div className="mb-4">
                                                <label 
                                                        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                                                <input 
                                                        id="precio"
                                                        type="number"
                                                        min="0"
                                                        placeholder="Precio Platillo"
                                                        value={formik.precio}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                                />
                                        </div>  
                                        
                                        {formik.touched.precio && formik.errors.precio ? (
                                                <Error mensaje={ formik.errors.precio } ></Error>
                                           ): null}  

                                        <div className="mb-4">
                                                <label 
                                                        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria</label>
                                                <select
                                                  id="categoria"
                                                  name="categoria"
                                                  value={formik.categoria}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}

                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                        <option value=""> -- Seleccione -- </option>
                                                        <option value="desayuno"> -- Desayuno -- </option>
                                                        <option value="comida"> -- Comida -- </option>
                                                        <option value="cena"> -- Cena -- </option>
                                                        <option value="bebida"> -- bebida -- </option>
                                                        <option value="postre"> -- Postre -- </option>
                                                        <option value="ensalada"> -- Ensalada -- </option>
                                                </select>
                                        </div>  

                                        {formik.touched.categoria && formik.errors.categoria ? (
                                                <Error mensaje={ formik.errors.categoria } ></Error>
                                           ): null}  

                                        <div className="mb-4">
                                                <label 
                                                        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                                                <FileUploader
                                                        accept="image/*"
                                                        id="imagen"
                                                        name="imagen"
                                                        randomizeFilename
                                                        storageRef={firebase.storage.ref("productos")}
                                                        onUploadStart={handleUploadStart}
                                                        onUploadError={handleUploadError}
                                                        onUploadSuccess={handleUploadSuccess}
                                                        onProgress={handleProgress}
                                                    />
                                        </div>  

                                        { subiendo && (
                                                <div className="h-12 relative w-full border">
                                                    <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{ width: `${progreso}%` }}>
                                                        {progreso} % 
                                                    </div>
                                                </div>
                                            ) }
                    
                                            {urlimagen && (
                                                <p className="bg-green-500 text-white p-3 text-center my-5">
                                                    La imagen se subió correctamente
                                                </p>
                                            ) }

                                        <div className="mb-4">
                                                <label 
                                                        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                                                <textarea
                                                        id="descripcion"
                                                        placeholder="Descripción"
                                                        value={formik.descripcion}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
      
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 "
                                                >
                                                
                                                </textarea>
                                        </div> 
                                        {formik.touched.descripcion && formik.errors.descripcion ? (
                                                <Error mensaje={ formik.errors.descripcion } ></Error>
                                           ): null}                                          
                                        <input 
                                                type="submit"
                                                className="bg-blue-400 hover:bg-blue-300, cursor-pointer w-full mt-5 p-2 text-white uppercase font-bold"
                                                value="Agregar Platillo"
                                        />                                                                                                                      

                                      </form>  
                        </div>
                    </div>

            </Fragment>

     );
}
 
export default NuevoPlatillo;