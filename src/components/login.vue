<script setup>
</script>

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
            <div class="loginButton">Entrar</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario: "",
            contraseña: "",
            mantener: false,
        }
    },
}
</script>

<style scoped>
</style>
