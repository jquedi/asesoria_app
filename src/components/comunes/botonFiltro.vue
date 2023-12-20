<template>
    <div class="botonFiltro" @click="abrirFiltro">
        <div class="iconoFiltro">
            F
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
        abrirFiltro(){
            this.$emit('abrirFiltro');
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