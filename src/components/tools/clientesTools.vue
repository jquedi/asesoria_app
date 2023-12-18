<script setup>
    import cliente from './toolsComponents/clientes/clienteTools.vue';
    import clienteInfo from './toolsComponents/clientes/clienteToolsInfo.vue';
    import botonCerrar from '../comunes/botonCerrar.vue';

    defineProps(['class']);
    
    const emit = defineEmits(['cerrar']);
</script>

<template>
    <div :class="class" class="fondoOscurecido" @click="cerrar">
    </div>
    <div :class="class" class="tool">
        <botonCerrar @cerrar="cerrar" />
        <cliente v-for="cliente in clientes" :key="cliente.id" :cliente="cliente" @click="clienteSelected = cliente, abrirCliente = true" />
        <clienteInfo v-if="abrirCliente" :cliente="clienteSelected" @cerrar="abrirCliente = false" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            abrirCliente: false,
            clienteSelected: {
            },
            clientes: {
                1: {
                    id: 1,
                    nif: '12345678A',
                    actividad: 'Actividad',
                    cnae: '9566',
                    iae: '1234',
                    nombre: 'Juan',
                    apellido: 'Perez',
                    telefono: '123456789',
                    email: 'juan@gmail.com',
                    contSinProcesar: 2
                },
                2: {
                    id: 2,
                    nif: '12345678A',
                    actividad: 'Actividad',
                    cnae: '9566',
                    iae: '1234',
                    nombre: 'Pedro',
                    apellido: 'Gomez',
                    telefono: '123456789',
                    email: 'pedro@gmail.com',
                    contSinProcesar: 50
                },
                3: {
                    id: 3,
                    nif: '12345678A',
                    actividad: 'Actividad',
                    cnae: '9566',
                    iae: '1234',
                    nombre: 'Pedro',
                    apellido: 'Gomez',
                    telefono: '123456789',
                    email: 'pedroooooooooooo@gmail.com',
                    contSinProcesar: 14
                },
                4: {
                    id: 4,
                    nif: '12345678A',
                    actividad: 'Actividad',
                    cnae: '9566',
                    iae: '1234',
                    nombre: 'Pedro',
                    apellido: 'Gomez',
                    telefono: '123456789',
                    email: 'pedro@gmail.com',
                    contSinProcesar: 20
                },
                5: {
                    id: 5,
                    nif: '12345678A',
                    actividad: 'Actividad',
                    cnae: '9566',
                    iae: '1234',
                    nombre: 'Pedro',
                    apellido: 'Gomez',
                    telefono: '123456789',
                    email: 'pedro@gmail.com',
                    contSinProcesar: 0
                }

            }
        }
    },
    watch: {
    },
    methods: {
        cerrar(){
            this.emit('cerrar');
        }
    },
    mounted() {
    },
    created(){
    }
}
</script>

<style scoped>
</style>