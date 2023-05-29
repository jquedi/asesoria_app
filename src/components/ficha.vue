<script setup>
defineProps({
  nombre: {
    type: String,
    required: true
  },
  tipobrillo: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="ficha" @mouseover="hover = true" @mouseleave="hover = false">
    <div :class="tipobrillo" ref="brillo"></div>
    <h1 class="green">{{ nombre }}</h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            hover: false
        }
    },
    watch: {
        hover: function(val){
            this.brillo(val)
        }
    },
    methods: {
        brillo(val){
            if(val){
                this.$refs.brillo.style.opacity = "0.5"
            }else{
                this.$refs.brillo.style.opacity = "0"
            }
        }
    },
    mounted() {
    }
}
</script>
<style scoped>
</style>
