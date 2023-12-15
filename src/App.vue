<script setup>
import menuNav from './components/menuNav.vue'
import login from './components/login.vue'
import { datosCliente } from '@/stores/counter'

import { db, auth } from '/workspaces/asesoria_app/src/firebase.js';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
</script>

<template>
  
  <login v-if="usuario == null && usuario != 0" @positiveAuth="usuarioAuth" />

  <RouterView v-if="usuario != null && usuario != 0" />

  <menuNav v-if="usuario != null && usuario != 0" id="menuNav" class="fixed w-90% h-90% bg-blue-400 z-20" />
  
  
</template>

<script>
export default {
    data() {
        return {
          usuario: 0,
        }
    },
    watch: {
    },
    methods: {
      usuarioAuth() {
        this.usuario = datosCliente().nombre
      },
      async autenticarSesion(){
        await onAuthStateChanged(auth, (user) => {
          if(user){
            user.getIdToken().then((token) => {
              if(token == localStorage.getItem('token')){
                this.obtenerDatosUsuario(user.uid);
              }else{
                datosCliente().cambiarNombre(null);
                this.usuarioAuth();
              }
            });
          }else{
            datosCliente().cambiarNombre(null);
            this.usuarioAuth();
          }
        });
      },
      async obtenerDatosUsuario(uid) {
          const docRef = doc(db, "administradores", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              // Aquí tienes acceso al nombre de usuario almacenado en Firestore.
              datosCliente().cambiarNombre(docSnap.data().nombre);
              this.usuarioAuth();
              // Procede a la siguiente parte de tu aplicación.
          } else {
              // El documento no existe.
              // Manejar la situación, como mostrar un error o crear un nuevo documento.
              console.log("No se encontraron datos del usuario.");
          }
      },
    },
    mounted() {
      this.autenticarSesion();
    },
    created(){
      // function verificarToken() {
        // const token = localStorage.getItem('token');
        // console.log(token);
        // if (token) {
        //   signInWithCustomToken(auth, token)
        //     .then((userCredential) => {
        //       console.log(3);
        //       // El token es válido y el usuario está autenticado
        //       console.log(userCredential);
        //     })
        //     .catch((error) => {
        //       // El token no es válido o ha expirado
        //       datosCliente().cambiarNombre(null);
        //     });
        // } else {
        //   // No hay token en el almacenamiento local, redirigir al inicio de sesión
        //   datosCliente().cambiarNombre(null);
        // }

      //   onAuthStateChanged(auth, (user) => {
      //     if (user) {
      //       // Usuario está autenticado, puedes obtener el UID del usuario así:
      //       // this.usuario = user.uid;
      //       console.log(user.uid);
      //       // Si necesitas el token, puedes obtenerlo así:
      //       user.getIdToken().then((token) => {
      //         if(token == localStorage.getItem('token')){
                
      //           const docRef = doc(db, "administradores", user.uid);
      //           const docSnap = getDoc(docRef);

      //           if (docSnap) {
      //               // Aquí tienes acceso al nombre de usuario almacenado en Firestore.
      //               datosCliente().cambiarNombre(docSnap.data().nombre);
      //               // Procede a la siguiente parte de tu aplicación.
      //           } else {
      //               // El documento no existe.
      //               // Manejar la situación, como mostrar un error o crear un nuevo documento.
      //               console.log("No se encontraron datos del usuario.");
      //           }
      //           console.log(true);
      //         }
      //         // Haz algo con el token, por ejemplo, verificarlo en tu servidor.
      //       });

      //       // Aquí también puedes actualizar el estado en tu tienda Vuex o Pini
      //     } else {
      //       // Usuario no está autenticado, posiblemente redirigir al inicio de sesión
      //       console.log(false);
      //       datosCliente().cambiarNombre(null);
      //     }
      //   });

      // }
      // verificarToken();
    }
}
</script>

<style scoped>

</style>
