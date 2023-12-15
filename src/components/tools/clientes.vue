<script setup>
    import botonCerrar from '../comunes/botonCerrar.vue'

    defineProps(['class'])
    
    const emit = defineEmits(['cerrar']);
</script>

<template>
    <div :class="class" class="fondoOscurecido" @click="cerrar">
    </div>
    <div :class="class" class="tool">
        <botonCerrar @cerrar="cerrar" />
    </div>
</template>
<script>
export default {
    data() {
        return {
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