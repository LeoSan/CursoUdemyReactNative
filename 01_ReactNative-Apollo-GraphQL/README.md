# ReactNative-Apollo-GraphQL-Node.js
Primera Practica avanzada de ReactNative-Apollo-GraphQL, se realizará un entrono servidor para que pueda ser consumido por ReacNative usando GraphQL y mongo DB, para una appa que pueda administrar proyectos. Cuenta como parte de desarrollo avanzado y como ultima practica de Udemy clase numero 215


<p align="center"><a href="https://github.com/LeoSan/ReactNative-Apollo-GraphQ" target="_blank"><img src="https://www.welcomedeveloper.com/static/d5efdb761342818d396d9bc3f5dd407e/7842b/nodejs-apollo-graphql-welcomedeveloper.png" width="400"></a></p>
<p align="center"><a href="https://github.com/LeoSan/ReactNative-Apollo-GraphQ" target="_blank"><img src="https://cink.es/blog/wp-content/uploads/2021/01/react-native-apps.jpg" width="400"></a></p>


### Comando Back Servidor Apollo 
- `npm init -y`
- `npm i apollo-server graphql` -> Apolo  es un servidor pero para  GraphQL 
- `npm i --save-dev nodemon`
- Debemos ajustar el package.json en los scripst -> 
```
<code>

  "scripts": {
    "start": "node .",
    "dev": "nodemon ."
  },
```  
- `npm i jsonwebtoken` -> Para generar token
- `npm list --depth=0`
- creamos nuestro archivo index.js definimos apollo server -> Esto estara en el manual solo para apollo Server -> [Guia Apollo Server]()
- `npm i mongoose dotenv` -> Pasamos a instalar nuestra base de datos mongoose y dotenv para variables de entorno
- `npm run dev` -> arrancamos el servidor 
- `npm i bcryptjs` -> Permite encriptar password 

### Comando para el FRONT 
- npx react-native init nombreApp
- npm install @react-navigation/native
- npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
- npm i @react-navigation/stack
```javascript 
 // Con esto le decimos android que use interfaz native ruta //android/app/build.gradle
    implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
```
- import 'react-native-gesture-handler'; -> Esto va al inicio del App.js
- `npm install native-base --force` -> `npm i native-base@2.15.2`
- `npm  i @apollo/client` -> Hay que instalar modo cliente en native para poder usar graphQl y consumir los servicios 
- `npm i apollo-link-http apollo-cache-inmemory` -> Instalamos estas dependencias para poder conectar GraphQL
- `npm i graphql` -> Instalamos GraphQL
- `npm i @react-native-community/async-storage --force` -> Para poder usar un localStoarge en Native
- `npm i apollo-link-context` -> Permite usar useContext en apolo server esto permite mantener que la variable este disponible en cualquuier componente 
- `npm i react-native-vector-icons` -> Permite instalar iconos al proyecto  
>Nota Debemos incorporar los siguientes pasos 
Paso 1: Alterar el android/app/build.gradle 
Paso 2: Poner esto al final del archivo apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" 
> Nota: Aqui creamos el archivo Config/apollo.js y usamos cliente 
```javascript
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const client = new  ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

```
>Nota: Luego de configurar el apollo cliente debemos buscar el index.js que esta en la raiz y realizar lo mismos que cuando se usa redux se debe crear un provider que permitira que el resto de los componentes puedan compartir los metodos 

```javascript

/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Apllo 
import client from './config/apollo'; 
import { ApolloProvider } from '@apollo/client'; // Todos los diferentes metodos que hay en apollo estara disponibles en los otros componentes 

const upTaskApp = ()=>(
    <ApolloProvider client = {client} >
        <App/>
    </ApolloProvider>

)

AppRegistry.registerComponent(appName, () => upTaskApp);


```
>Nota: Configuramos nuestro App.js creando nuestros Stack no olvides que en esta sessión debes rodear todos con <Root> </Root> claro debes importarlo tambien  

- `npm list --depth=0`
- `adb devices`
- `npx react-native run-android --deviceId=bbd989bb` 
- `netstat` ->para saber los puertos 
- [Despliegue - Heroku ](https://github.com/LeoSan/HerokuAppTarea) 

### Detalles pendientes 
- Buscar un curso intensivo para consultas GRAPHQL 
- Fusilarme la documentación de interfaz ReactNative
- Fusilarme la documentación y validar los diferentes eventos que ofrece react-native onPress, onLongPress entre otros 
- Resolver el problema que no veo el debuggin 
- 

### Links Guia 

- [Mi Bitacora - Drive ](https://docs.google.com/document/d/1qzUXm0nHzAiLXFKRf7FKg1RRHqG7ZoVzbPqw6jRispg)
- [Curso - Udemy ](https://www.udemy.com/course/react-native-crea-aplicaciones-para-android-y-ios-con-react/learn/lecture/19193254#overview)
- [Estudios - Platzi](https://platzi.com/p/LEONARDCUENCA/)
- [Estudios - Udemy](https://www.udemy.com/user/leonard-cuenca-roa/)
- [Docs- Apollo](https://www.apollographql.com/docs/react/)



https://pandao.github.io/editor.md/en.html


