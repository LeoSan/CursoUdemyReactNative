import React, {Fragment} from 'react';

const Error = ({mensaje}) => {
    return ( 
        <Fragment>
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
            <p className="font-bold">Hubo un error:</p>        
            <p >{mensaje}</p>
            </div>
        </Fragment>
     );
}
 
export default Error;