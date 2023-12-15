<script setup>
    defineProps(['class'])
    
    const emit = defineEmits(['cerrar']);
</script>

<template>
    <div :class="class" class="fondoOscurecido" @click="cerrar">
    </div>
    <div :class="class" class="tool">
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