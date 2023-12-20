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
    components: {
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
        cerrar(){
            this.$emit('cerrar');
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