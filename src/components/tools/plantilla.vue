<template>
    <div :class="classValue" class="fondoOscurecido" @click="cerrar">
    </div>
    <div :class="classValue" class="tool">
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        classValue: {
            type: String,
            default: ''
        }
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