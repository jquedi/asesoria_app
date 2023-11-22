<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="utilidad-content">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<style scoped>
</style>
