<template>
    <div :class="tipo">
        {{ texto }}
        <p class="hora">{{ hora }}</p>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        tipo: {
            type: String,
            default: ''
        },
        texto: {
            type: String,
            default: ''
        },
        hora: {
            type: String,
            default: ""
        }
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