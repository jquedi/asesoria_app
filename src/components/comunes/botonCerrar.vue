<script setup>
    const emit = defineEmits(['cerrar']);
</script>

<template>
    <div class="botonCerrar" @click="cerrar">
        <div class="x">
            X
        </div>
        <div class="cerrar">
            Cerrar
        </div>
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