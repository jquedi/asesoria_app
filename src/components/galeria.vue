<script setup>
import ficha from './ficha.vue'
defineProps({
})
</script>

<template>
    <div id="galeria">
        <ficha nombre="Photo set 1" tipobrillo="brillo1" />
        <ficha nombre="Photo set 2" tipobrillo="brillo2" />
        <ficha nombre="Photo set 3" tipobrillo="brillo1" />
        <ficha nombre="Photo set 4" tipobrillo="brillo1" />
        <ficha nombre="Photo set 5" tipobrillo="brillo1" />
        <ficha nombre="Photo set 6" tipobrillo="brillo1" />
        <ficha nombre="Photo set 7" tipobrillo="brillo1" />
        <ficha nombre="Photo set 8" tipobrillo="brillo1" />
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style scoped>
</style>