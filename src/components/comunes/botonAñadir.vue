<template>
    <div class="botonAñadir" @click="añadir">
        <div class="simboloMas">
            +
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
        añadir(){
            this.$emit('añadir');
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