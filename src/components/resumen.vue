<script setup>
import { datosCliente } from '@/stores/counter'
defineProps({
})
</script>

<template>
    <div>
        <h3 class="prueba text-3xl font-bold underline">{{datos.nombre}}</h3>
        <input v-model="nombre" type="text">
    </div>
</template>
<script>
export default {
    data() {
        return {
            datos: datosCliente(),
            nombre: ""
        }
    },
    watch: {
        nombre: function(val){
            this.datos.cambiarNombre(val)
        },
    },
    methods: {

    },
    mounted() {
    }
}
</script>
<style scoped>
</style>
