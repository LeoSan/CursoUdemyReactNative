# AppReactNativeRestaurantCliente
Práctica de Udemy Representando el modo cliente creado con app-creat-reat y firebase y tailwind es la primera parte, la segunda parte se enlazara con app Native para que funcione en el celular. Consiste en un menú de tienda donde realizar el pedido desde el celular y este se refresca en una pantalla en la cocina con el pedido tomado por el celular. 


<p align="center"><a href="https://github.com/LeoSan/AppReactNativeRestaurantCliente/edit/main/README.md" target="_blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc2Y2gmQB5zuaBd1AfN_AyEgoTgxPF65i7GwlvrbnnP_RUlubieG19WFnonCtS4ZfAox4&usqp=CAU" width="400"></a></p>
<p align="center"><a href="https://github.com/LeoSan/AppReactNativeRestaurantCliente/edit/main/README.md" target="_blank"><img src="https://dev-to-uploads.s3.amazonaws.com/i/ilxs4qnlqlvvai9nm7vg.png" width="400"></a></p>
<p align="center"><a href="https://github.com/LeoSan/AppReactNativeRestaurantCliente/edit/main/README.md" target="_blank"><img src="https://www.gstatic.com/devrel-devsite/prod/v702c60b70d68da067f4d656556a48e4ab1cf14be10bb79e46f353f3fdfe8505d/firebase/images/lockup.png?dcb_=0.060000181048783796" width="400"></a></p>

### Un Proyecto avanzado e Interesante, Tecnologías usadas  

- React    -> create-react-app -> Para montar la arquitectura react-js-node
- Firebase -> Integramos firebase para el manejo de base de datos  
- Formik   -> Para organizar el formulario 
- Yup      -> Para organizar las validaciones del formulario 
- TailWind -> Para organizar y maquetar las interfaces  
- react-router -> Para generar los Router 
- react-router-dom -> Enlaces y navegación 
- react -> useContext y useReducer 

## Es mi forma de Practicar lo Nuevo de React - Native - Avanzado -Fullstack

### Comandos Usados en orden -> para el ambiente servidorCliente -> Desarollo Front y back 

- `npx create-react-app nomproyecto`
- `npm i --save-dev autoprefixer postcss-cli tailwindcss`
- `npx tailwind init tailwind.js`
- `npm install --save react-router@next history`
- `npm i react-router@next react-router-dom@next`
- `npm install formik`
- `npm install yup`
- `npm install firebase`
- `npm i react-firebase-file-uploader`

### Comandos Usados en orden -> para el ambiente appCliente -> Desarollo Front y back -> Android y OIS 
- npx react-native init appRestaurant
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
- `npm i react-native-vector-icons`  -> video 195
- `npm list --depth=0`
- `adb devices`
- `npx react-native run-android --deviceId=bbd989bb` 
- `netstat` ->para saber los puertos 


### Cosas que quedan pendiente Se irán aprendiendo en el camino. 
- Aprender más Tailwind  

### Links Guia 

- [Mi Bitacora - Drive ](https://docs.google.com/presentation/d/1ahi-mqpHE9Duy4P3NKl36o2OM8j1EGqRbzSEjlijEKs/edit#slide=id.gdc96588246_0_8)
- [Curso - Udemy ](https://www.udemy.com/course/react-native-crea-aplicaciones-para-android-y-ios-con-react/learn/lecture/19173136#overview)
- [Estudios - Platzi](https://platzi.com/p/LEONARDCUENCA/)
- [Estudios - Udemy](https://www.udemy.com/user/leonard-cuenca-roa/)
- https://pandao.github.io/editor.md/en.html