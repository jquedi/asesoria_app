<script setup>
    const emit = defineEmits(['añadir']);
</script>

<template>
    <div class="botonAñadir" @click="añadir">
        <div class="simboloMas">
            +
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
        añadir(){
            this.emit('añadir');
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