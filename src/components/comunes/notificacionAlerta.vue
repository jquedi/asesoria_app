<template>
    <div class="notificacionAlerta" @click="añadir">
        <div class="valorNot">
            {{ valor }}
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        valor: {
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
    },
    mounted() {
    },
    created(){
    }
}
</script>

<style scoped>
</style>