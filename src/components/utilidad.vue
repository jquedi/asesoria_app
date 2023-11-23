<script setup>
import todo_list from './todo_list.vue'
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
      <todo_list v-if="msg === 'todo_list'" />
    </div>
  </div>
</template>

<style scoped>
</style>
