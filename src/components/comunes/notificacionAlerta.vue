<script setup>
    defineProps(['valor'])
</script>

<template>
    <div class="notificacionAlerta" @click="añadir">
        <div class="valorNot">
            {{ valor }}
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
    },
    mounted() {
    },
    created(){
    }
}
</script>

<style scoped>
</style>