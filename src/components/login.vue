<template>
    <div class="login">
        <div class="imagenLogin">
            <img id="imgLogin" class="m-auto inset-0" src="https://acegif.com/wp-content/gifs/dancing-pig-22.gif" alt="">
        </div>
        <div class="loginForm">
            <div class="loginTitulo">INICIAR SESIÓN</div>
            <div class="loginCampo">
                <div class="loginTituloCampo">Usuario</div> 
                <input class="loginFormCampo" type="text" v-model="usuario">
            </div>
            <div class="loginCampo">
                <div class="loginTituloCampo">Contraseña</div> 
                <input class="loginFormCampo" type="password" v-model="contraseña">
                <div class="loginStay">
                    <input class="loginCheck" type="checkbox" v-model="mantener">
                    <div class="loginText">Mantener sesión iniciada</div>
                </div>
            </div>
            <div class="loginButton"  @click="iniciarSesion" >Entrar</div>
        </div>
    </div>
</template>

<script>
import { db, auth } from '/workspaces/asesoria_app/src/firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { datosCliente } from '@/stores/counter';

export default {
    data() {
        return {
            datos: datosCliente(),
            usuario: "",
            contraseña: "",
            mantener: false,
            uid: "",
            token: "",
        }
    },
    watch: {
    },
    methods: {
        async iniciarSesion() {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, this.usuario, this.contraseña);
                // El usuario ha iniciado sesión, ahora puedes obtener el UID del usuario.
                this.uid = userCredential.user.uid;
                // Obtener el Firebase ID token
                userCredential.user.getIdToken().then((idToken) => {
                    this.token = idToken;
                    // Aquí puedes almacenar el token en localStorage si deseas mantener la sesión
                    if (this.mantener) {
                        localStorage.setItem('token', idToken);
                    }
                });
                // Llama a la función para obtener los datos adicionales del usuario de Firestore.
                await this.obtenerDatosUsuario(this.uid);
            } catch (error) {
                // Manejar errores aquí.
                alert("El usuario y/o contraseña no son correctos."); // Muestra un mensaje simple por ahora.
            }
        },

        async obtenerDatosUsuario() {
            const docRef = doc(db, "administradores", this.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Aquí tienes acceso al nombre de usuario almacenado en Firestore.
                this.datos.cambiarNombre(docSnap.data().nombre); 
                this.datos.cambiarUsuario(docSnap.data().usuario); 
                this.$emit('positiveAuth', true);
                // Procede a la siguiente parte de tu aplicación.
            } else {
                // El documento no existe.
                // Manejar la situación, como mostrar un error o crear un nuevo documento.
                console.log("No se encontraron datos del usuario.");
            }
        },

    },
    mounted() {
    },
    created(){
    }
}
</script>


<style scoped>
</style>
