<template>
<div class="clientes-box">
    <div class="grid grid-cols-2 grid-rows-4 gap-2 p-3 w-full h-full">
        <cliente></cliente>
        <cliente></cliente>
        <cliente></cliente>
        <cliente></cliente>
        <cliente></cliente>
        <cliente></cliente>
        <cliente></cliente>
    </div>
    <clienteAbierto></clienteAbierto>
</div>
</template>
<script>
import cliente from './clientes_sub/cliente.vue'
import clienteAbierto from './clientes_sub/clienteAbierto.vue'
export default {
    components: {
        cliente,
        clienteAbierto
    },
    props: {
    },
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
    },
    mounted() {
    },
    created(){
    }
}
</script>

<style scoped>
</style>
