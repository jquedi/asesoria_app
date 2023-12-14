<script setup>
import menuNav from './components/menuNav.vue'
import login from './components/login.vue'
import { datosCliente } from '@/stores/counter'
</script>

<template>
  
  <login v-if="usuario == null" @positiveAuth="usuarioAuth" />

  <RouterView v-if="usuario != null" />

  <menuNav v-if="usuario != null" id="menuNav" class="fixed w-90% h-90% bg-blue-400 z-20" />
  
  
</template>

<script>
export default {
    data() {
        return {
          usuario: datosCliente().nombre,
        }
    },
    watch: {
    },
    methods: {
      usuarioAuth() {
        this.usuario = datosCliente().nombre
      }
    },
    mounted() {
    },
    created(){
      // function guardarToken(){
      //   localStorage.setItem('token', "1234")
      // }
      // guardarToken()
    }
}
</script>

<style scoped>

</style>
